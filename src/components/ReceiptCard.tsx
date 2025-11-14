import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/store/types';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';
import { PAYMENT_FEE } from '@/utils/constants';

interface ReceiptCardProps {
  transaction: Transaction;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ transaction }) => {
  const theme = useTheme();
  const total = transaction.amount + PAYMENT_FEE;
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}
      accessibilityRole="summary"
    >
      <Text style={[styles.title, { color: theme.text }]}>Payment Receipt</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.muted }]}>Amount</Text>
        <Text style={[styles.value, { color: theme.text }]}>{formatNGN(transaction.amount)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.muted }]}>Fees</Text>
        <Text style={[styles.value, { color: theme.text }]}>{formatNGN(PAYMENT_FEE)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.muted }]}>Total</Text>
        <Text style={[styles.value, { color: theme.text }]}>{formatNGN(total)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.muted }]}>Reference</Text>
        <Text style={[styles.value, { color: theme.text }]}>{transaction.reference}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.muted }]}>Timestamp</Text>
        <Text style={[styles.value, { color: theme.text }]}>{new Date(transaction.createdAt).toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  label: {
    fontSize: 12
  },
  value: {
    fontSize: 14,
    fontWeight: '600'
  }
});
