import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';

export const FamilyScreen: React.FC = () => {
  const theme = useTheme();
  const { wallets } = useFamilyStore();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.heading, { color: theme.text }]}>Family wallets</Text>
      {wallets.map((wallet) => (
        <View key={wallet.id} style={[styles.card, { backgroundColor: theme.card }]}> 
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>{wallet.name}</Text>
            <Text style={[styles.balance, { color: theme.text }]}>{formatNGN(wallet.balance)}</Text>
          </View>
          <Text style={{ color: theme.muted }}>{wallet.members.length} members</Text>
          {wallet.sharedBillIds.length ? (
            <Text style={{ color: theme.muted, marginTop: 8 }}>
              Shared bills: {wallet.sharedBillIds.join(', ')}
            </Text>
          ) : null}
          {wallet.allowanceRule ? (
            <Text style={{ color: theme.muted, marginTop: 8 }}>
              Allowance: ₦{wallet.allowanceRule.monthlyLimit.toLocaleString()} on day {wallet.allowanceRule.autoTopUpDay}
            </Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            accessibilityRole="button"
            accessibilityLabel={`Manage ${wallet.name}`}
          >
            <Text style={styles.buttonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120 },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, marginBottom: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  balance: { fontSize: 16, fontWeight: '600' },
  button: { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
