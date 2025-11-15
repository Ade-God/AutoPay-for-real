import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { useBillsStore } from '@/store/useBillsStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';
import { EmptyState } from '@/components/EmptyState';

export const BillDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BillDetail'>>();
  const theme = useTheme();
  const { bills, providers, toggleBill } = useBillsStore();
  const { transactions } = usePaymentsStore();
  const bill = bills.find((item) => item.id === route.params.billId);
  const provider = providers.find((item) => item.id === bill?.providerId);

  const history = transactions.filter((tx) => tx.billId === bill?.id);

  if (!bill) {
    return <EmptyState title="Bill not found" />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.card }]}> 
        <Text style={[styles.title, { color: theme.text }]}>{provider?.name}</Text>
        <Text style={{ color: theme.muted }}>Account: {bill.accountRef}</Text>
        <Text style={{ color: theme.text, marginTop: 8 }}>{formatNGN(bill.amount)} monthly</Text>
        <Text style={{ color: theme.muted }}>Next run: {new Date(bill.nextRunAt).toLocaleDateString()}</Text>
        <TouchableOpacity
          onPress={() => toggleBill(bill.id)}
          style={[styles.button, { backgroundColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Toggle bill"
        >
          <Text style={styles.buttonText}>{bill.active ? 'Pause bill' : 'Resume bill'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, { backgroundColor: theme.card }]}> 
        <Text style={[styles.sectionTitle, { color: theme.text }]}>History</Text>
        {history.length === 0 ? (
          <EmptyState title="No history yet" />
        ) : (
          history.map((tx) => (
            <View key={tx.id} style={styles.row}>
              <Text style={{ color: theme.text }}>{new Date(tx.createdAt).toLocaleDateString()}</Text>
              <Text style={{ color: theme.muted }}>{tx.status}</Text>
              <Text style={{ color: theme.text }}>{formatNGN(tx.amount)}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  button: { marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }
});
