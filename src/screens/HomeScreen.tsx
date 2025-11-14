import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { BalanceCard } from '@/components/BalanceCard';
import { UpcomingPaymentsCard } from '@/components/UpcomingPaymentsCard';
import { BudgetSnapshotCard } from '@/components/BudgetSnapshotCard';
import { InsightsCard } from '@/components/InsightsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/useAuthStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useBillsStore } from '@/store/useBillsStore';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useTheme } from '@/utils/theme';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { user, maskedBalance, toggleMaskedBalance } = useAuthStore();
  const { transactions, notifications } = usePaymentsStore();
  const { categories } = useBudgetStore();
  const { bills } = useBillsStore();
  const { wallets } = useFamilyStore();

  const upcoming = useMemo(
    () => transactions.filter((tx) => tx.status !== 'Success').slice(0, 3),
    [transactions]
  );

  const insights = useMemo(() => [
    {
      title: 'Bills this month',
      description: `${bills.length} recurring bills active`
    },
    {
      title: 'Family wallets',
      description: `${wallets.length} wallets sharing spending`
    }
  ], [bills.length, wallets.length]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.greeting, { color: theme.text }]}>Hello, {user?.name ?? 'AutoPay user'}</Text>
      <BalanceCard balance={user?.totalBalance ?? 0} masked={maskedBalance} onToggleMask={toggleMaskedBalance} />
      <View style={styles.quickActions}>
        {[
          { label: 'Pay Now', color: theme.primary, route: 'QuickPayFlow' as const },
          { label: 'Add Bill', color: theme.success, route: 'AddBillFlow' as const },
          { label: 'Create Budget', color: theme.warning, route: 'BudgetFlow' as const },
          { label: 'Invite Family', color: theme.primary, route: 'FamilyFlow' as const }
        ].map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[styles.quickAction, { backgroundColor: action.color }]}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            onPress={() => navigation.navigate(action.route)}
          >
            <Text style={styles.quickActionText}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <UpcomingPaymentsCard upcoming={upcoming} />
      <BudgetSnapshotCard categories={categories.slice(0, 3)} />
      <InsightsCard insights={insights} />
      <View style={[styles.notifications, { backgroundColor: theme.card }]}> 
        <Text style={[styles.notificationsTitle, { color: theme.text }]}>Notifications</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text style={[styles.notificationTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.notificationMessage, { color: theme.muted }]}>{item.message}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.border }]} />}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20,
    paddingBottom: 120
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  quickAction: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: 'center'
  },
  quickActionText: {
    color: '#fff',
    fontWeight: '600'
  },
  notifications: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 32
  },
  notificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  notificationItem: {
    paddingVertical: 8
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600'
  },
  notificationMessage: {
    fontSize: 12,
    marginTop: 4
  },
  separator: {
    height: StyleSheet.hairlineWidth
  }
});
