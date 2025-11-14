import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '@/navigation/types';
import { useTheme } from '@/utils/theme';
import { useAuthStore } from '@/store/useAuthStore';

 type Nav = NativeStackNavigationProp<OnboardingStackParamList>;

export const ConnectBankIntroScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { user, setUser } = useAuthStore();

  const completeOnboarding = () => {
    if (user) {
      setUser({ ...user, hasCompletedOnboarding: true });
    }
    navigation.getParent()?.navigate('RootTabs' as never);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}
      accessible
      accessibilityLabel="Connect your bank"
    >
      <Text style={[styles.title, { color: theme.text }]}>Connect your bank</Text>
      <Text style={{ color: theme.muted, textAlign: 'center' }}>
        Link your preferred bank to sync balances and transactions securely. AutoPay has read-only access and cannot move
        funds.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={completeOnboarding}
        accessibilityRole="button"
        accessibilityLabel="Connect later"
      >
        <Text style={styles.buttonText}>I will connect later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  button: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24, marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: '600' }
});
