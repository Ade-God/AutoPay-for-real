import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/store/types';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';

interface PaymentListItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
}

export const PaymentListItem: React.FC<PaymentListItemProps> = ({ transaction }) => {
  const theme = useTheme();
  const statusColor =
    transaction.status === 'Success'
      ? theme.success
      : transaction.status === 'Pending'
        ? theme.warning
        : theme.danger;

  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Transaction ${transaction.description}`}
    >
      <View style={styles.header}>
        <Text style={[styles.description, { color: theme.text }]}>{transaction.description}</Text>
        <Text style={[styles.amount, { color: theme.text }]}>{formatNGN(transaction.amount)}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.meta, { color: theme.muted }]}>{new Date(transaction.createdAt).toLocaleString()}</Text>
        <Text style={[styles.status, { color: statusColor }]}>{transaction.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    fontWeight: '600'
  },
  amount: {
    fontSize: 14,
    fontWeight: '600'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  meta: {
    fontSize: 12
  },
  status: {
    fontSize: 12,
    fontWeight: '600'
  }
});
