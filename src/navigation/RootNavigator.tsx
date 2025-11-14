import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity, Text, StyleSheet, Platform, ActionSheetIOS, Alert, AppState } from 'react-native';
import { RootStackParamList, TabParamList } from './types';
import { HomeScreen } from '@/screens/HomeScreen';
import { PaymentsScreen } from '@/screens/PaymentsScreen';
import { BillsScreen } from '@/screens/BillsScreen';
import { BudgetScreen } from '@/screens/BudgetScreen';
import { FamilyScreen } from '@/screens/FamilyScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { BillDetailScreen } from '@/screens/BillDetailScreen';
import { AddBillTypeScreen } from '@/screens/AddBill/AddBillTypeScreen';
import { AddBillProviderScreen } from '@/screens/AddBill/AddBillProviderScreen';
import { AddBillDetailsScreen } from '@/screens/AddBill/AddBillDetailsScreen';
import { AddBillScheduleScreen } from '@/screens/AddBill/AddBillScheduleScreen';
import { AddBillConfirmScreen } from '@/screens/AddBill/AddBillConfirmScreen';
import { QuickPayScreen } from '@/screens/PaymentFlow/QuickPayScreen';
import { PaymentMethodScreen } from '@/screens/PaymentFlow/PaymentMethodScreen';
import { PaymentConfirmScreen } from '@/screens/PaymentFlow/PaymentConfirmScreen';
import { PaymentReceiptScreen } from '@/screens/PaymentFlow/PaymentReceiptScreen';
import { CreateBudgetScreen } from '@/screens/BudgetFlow/CreateBudgetScreen';
import { CategoryDetailScreen } from '@/screens/BudgetFlow/CategoryDetailScreen';
import { FamilyDashboardScreen } from '@/screens/FamilyFlow/FamilyDashboardScreen';
import { CreateFamilyWalletScreen } from '@/screens/FamilyFlow/CreateFamilyWalletScreen';
import { InviteMemberScreen } from '@/screens/FamilyFlow/InviteMemberScreen';
import { MemberPermissionsScreen } from '@/screens/FamilyFlow/MemberPermissionsScreen';
import { TransactionsListScreen } from '@/screens/Transactions/TransactionsListScreen';
import { TransactionDetailScreen } from '@/screens/Transactions/TransactionDetailScreen';
import { SecurityScreen } from '@/screens/Settings/SecurityScreen';
import { PaymentMethodsScreen } from '@/screens/Settings/PaymentMethodsScreen';
import { NotificationsScreen } from '@/screens/Settings/NotificationsScreen';
import { ConnectedBanksScreen } from '@/screens/Settings/ConnectedBanksScreen';
import { HelpCenterScreen } from '@/screens/Settings/HelpCenterScreen';
import { LegalScreen } from '@/screens/Settings/LegalScreen';
import { WelcomeScreen } from '@/screens/Onboarding/WelcomeScreen';
import { SignupScreen } from '@/screens/Onboarding/SignupScreen';
import { VerifyOTPScreen } from '@/screens/Onboarding/VerifyOTPScreen';
import { CreatePINScreen } from '@/screens/Onboarding/CreatePINScreen';
import { EnableBiometricScreen } from '@/screens/Onboarding/EnableBiometricScreen';
import { ConnectBankIntroScreen } from '@/screens/Onboarding/ConnectBankIntroScreen';
import { useTheme } from '@/utils/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useBillsStore } from '@/store/useBillsStore';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useFamilyStore } from '@/store/useFamilyStore';
import { PINPad } from '@/components/PINPad';
import { SESSION_TIMEOUT_MS } from '@/utils/constants';
import { getPin } from '@/services/security';
import { trackEvent } from '@/utils/analytics';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const AddBillStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();
const BudgetStack = createNativeStackNavigator();
const FamilyStack = createNativeStackNavigator();
const TransactionStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const OnboardingStack = createNativeStackNavigator();

const TabNavigator: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const openSheet = () => {
    const actions = [
      { label: 'New Payment', route: 'QuickPayFlow' as const },
      { label: 'New Bill', route: 'AddBillFlow' as const },
      { label: 'New Budget', route: 'BudgetFlow' as const },
      { label: 'New Family Wallet', route: 'FamilyFlow' as const }
    ];

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...actions.map((a) => a.label), 'Cancel'],
          cancelButtonIndex: actions.length
        },
        (index) => {
          if (index < actions.length) {
            // @ts-expect-error navigation type
            navigation.navigate(actions[index].route as never);
          }
        }
      );
    } else {
      Alert.alert('Create new', undefined, [
        ...actions.map((action) => ({
          text: action.label,
          onPress: () => {
            // @ts-expect-error navigation type
            navigation.navigate(action.route as never);
          }
        })),
        { text: 'Cancel', style: 'cancel' }
      ]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.muted,
          tabBarStyle: { backgroundColor: theme.card },
          tabBarIcon: ({ color, size }) => {
            const icons: Record<string, string> = {
              Home: 'home',
              Payments: 'swap-horizontal',
              Bills: 'document-text',
              Budget: 'pie-chart',
              Family: 'people'
            };
            return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Payments" component={PaymentsScreen} />
        <Tab.Screen name="Bills" component={BillsScreen} />
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Family" component={FamilyScreen} />
      </Tab.Navigator>
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={openSheet}
        accessibilityRole="button"
        accessibilityLabel="Create new action"
      >
        <Text style={styles.fabText}>+ New</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddBillFlow = () => (
  <AddBillStack.Navigator>
    <AddBillStack.Screen
      name="AddBillType"
      component={AddBillTypeScreen}
      options={{ title: 'Select Bill Type' }}
    />
    <AddBillStack.Screen
      name="AddBillProvider"
      component={AddBillProviderScreen}
      options={{ title: 'Choose Provider' }}
    />
    <AddBillStack.Screen
      name="AddBillDetails"
      component={AddBillDetailsScreen}
      options={{ title: 'Bill Details' }}
    />
    <AddBillStack.Screen
      name="AddBillSchedule"
      component={AddBillScheduleScreen}
      options={{ title: 'Schedule Payment' }}
    />
    <AddBillStack.Screen
      name="AddBillConfirm"
      component={AddBillConfirmScreen}
      options={{ title: 'Confirm Bill' }}
    />
  </AddBillStack.Navigator>
);

const PaymentFlow = () => (
  <PaymentStack.Navigator>
    <PaymentStack.Screen name="QuickPay" component={QuickPayScreen} options={{ title: 'Quick Pay' }} />
    <PaymentStack.Screen
      name="PaymentMethod"
      component={PaymentMethodScreen}
      options={{ title: 'Select Method' }}
    />
    <PaymentStack.Screen
      name="PaymentConfirm"
      component={PaymentConfirmScreen}
      options={{ title: 'Confirm Payment' }}
    />
    <PaymentStack.Screen
      name="PaymentReceipt"
      component={PaymentReceiptScreen}
      options={{ title: 'Payment Receipt' }}
    />
  </PaymentStack.Navigator>
);

const BudgetFlow = () => (
  <BudgetStack.Navigator>
    <BudgetStack.Screen
      name="CreateBudget"
      component={CreateBudgetScreen}
      options={{ title: 'Create Budget' }}
    />
    <BudgetStack.Screen
      name="CategoryDetail"
      component={CategoryDetailScreen}
      options={{ title: 'Category Detail' }}
    />
  </BudgetStack.Navigator>
);

const FamilyFlow = () => (
  <FamilyStack.Navigator>
    <FamilyStack.Screen
      name="FamilyDashboard"
      component={FamilyDashboardScreen}
      options={{ title: 'Family Dashboard' }}
    />
    <FamilyStack.Screen
      name="CreateFamilyWallet"
      component={CreateFamilyWalletScreen}
      options={{ title: 'Create Family Wallet' }}
    />
    <FamilyStack.Screen
      name="InviteMember"
      component={InviteMemberScreen}
      options={{ title: 'Invite Member' }}
    />
    <FamilyStack.Screen
      name="MemberPermissions"
      component={MemberPermissionsScreen}
      options={{ title: 'Permissions' }}
    />
  </FamilyStack.Navigator>
);

const TransactionFlow = () => (
  <TransactionStack.Navigator>
    <TransactionStack.Screen
      name="TransactionsList"
      component={TransactionsListScreen}
      options={{ title: 'Transactions' }}
    />
    <TransactionStack.Screen
      name="TransactionDetail"
      component={TransactionDetailScreen}
      options={{ title: 'Transaction Detail' }}
    />
  </TransactionStack.Navigator>
);

const SettingsFlow = () => (
  <SettingsStack.Navigator>
    <SettingsStack.Screen name="Security" component={SecurityScreen} options={{ title: 'Security' }} />
    <SettingsStack.Screen
      name="PaymentMethods"
      component={PaymentMethodsScreen}
      options={{ title: 'Payment Methods' }}
    />
    <SettingsStack.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{ title: 'Notifications' }}
    />
    <SettingsStack.Screen
      name="ConnectedBanks"
      component={ConnectedBanksScreen}
      options={{ title: 'Connected Banks' }}
    />
    <SettingsStack.Screen
      name="HelpCenter"
      component={HelpCenterScreen}
      options={{ title: 'Help Center' }}
    />
    <SettingsStack.Screen name="Legal" component={LegalScreen} options={{ title: 'Legal' }} />
  </SettingsStack.Navigator>
);

const OnboardingFlow = () => (
  <OnboardingStack.Navigator>
    <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <OnboardingStack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create account' }} />
    <OnboardingStack.Screen name="VerifyOTP" component={VerifyOTPScreen} options={{ title: 'Verify OTP' }} />
    <OnboardingStack.Screen name="CreatePIN" component={CreatePINScreen} options={{ title: 'Create PIN' }} />
    <OnboardingStack.Screen
      name="EnableBiometric"
      component={EnableBiometricScreen}
      options={{ title: 'Enable Biometrics' }}
    />
    <OnboardingStack.Screen
      name="ConnectBankIntro"
      component={ConnectBankIntroScreen}
      options={{ title: 'Connect Bank' }}
    />
  </OnboardingStack.Navigator>
);

const PinLockOverlay: React.FC = () => {
  const theme = useTheme();
  const { sessionLocked, unlockSession, pinSet } = useAuthStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pin.length === 4) {
      (async () => {
        const storedPin = await getPin();
        if (!storedPin || storedPin === pin) {
          unlockSession();
          setPin('');
          setError(null);
        } else {
          setError('Incorrect PIN');
          setPin('');
        }
      })();
    }
  }, [pin, unlockSession]);

  if (!sessionLocked || !pinSet) return null;

  return (
    <View style={[styles.lockOverlay, { backgroundColor: 'rgba(5, 8, 22, 0.9)' }]}
      accessibilityViewIsModal
      accessible
    >
      <Text style={[styles.lockTitle, { color: theme.text }]}>Enter PIN to continue</Text>
      {error ? <Text style={{ color: theme.danger, marginBottom: 12 }}>{error}</Text> : null}
      <PINPad value={pin} onChange={setPin} />
    </View>
  );
};

export const RootNavigator: React.FC = () => {
  const { user, setUser, lockSession, updateLastActive } = useAuthStore();
  const theme = useTheme();
  const [appState, setAppState] = useState(AppState.currentState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!user) {
      setUser({
        id: 'user_1',
        name: 'Peter',
        email: 'peter@autopay.ng',
        phone: '+2348012345678',
        hasCompletedOnboarding: true,
        kycStatus: 'verified',
        totalBalance: 350000
      });
    }
  }, [user, setUser]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState) => {
      if (appState.match(/active/) && nextState.match(/inactive|background/)) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          lockSession();
          timeoutRef.current = null;
        }, SESSION_TIMEOUT_MS);
      }
      if (nextState === 'active') {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        updateLastActive();
      }
      setAppState(nextState);
    });
    return () => subscription.remove();
  }, [appState, lockSession, updateLastActive]);

  useEffect(() => {
    // populate stores with mocks on first load
    const billsStore = useBillsStore.getState();
    const paymentsStore = usePaymentsStore.getState();
    const budgetStore = useBudgetStore.getState();
    const familyStore = useFamilyStore.getState();

    if (billsStore.bills.length) trackEvent('bills_loaded', { count: billsStore.bills.length });
    if (paymentsStore.transactions.length) trackEvent('transactions_loaded');
    if (budgetStore.categories.length) trackEvent('budget_loaded');
    if (familyStore.wallets.length) trackEvent('family_loaded');
  }, []);

  const initialRoute = useMemo(() =>
    user?.hasCompletedOnboarding ? 'RootTabs' : 'Onboarding', [user?.hasCompletedOnboarding]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <RootStack.Navigator initialRouteName={initialRoute}>
        <RootStack.Screen name="RootTabs" component={TabNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="Onboarding" component={OnboardingFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <RootStack.Screen name="BillDetail" component={BillDetailScreen} options={{ title: 'Bill Detail' }} />
        <RootStack.Screen name="AddBillFlow" component={AddBillFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="QuickPayFlow" component={PaymentFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="BudgetFlow" component={BudgetFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="FamilyFlow" component={FamilyFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="Transactions" component={TransactionFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="Security" component={SettingsFlow} options={{ headerShown: false }} />
        <RootStack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: 'Payment Methods' }} />
        <RootStack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
        <RootStack.Screen name="ConnectedBanks" component={ConnectedBanksScreen} options={{ title: 'Connected Banks' }} />
        <RootStack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ title: 'Help Center' }} />
        <RootStack.Screen name="Legal" component={LegalScreen} options={{ title: 'Legal' }} />
      </RootStack.Navigator>
      <PinLockOverlay />
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6
  },
  fabText: {
    color: '#fff',
    fontWeight: '700'
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding: 24
  },
  lockTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16
  }
});
