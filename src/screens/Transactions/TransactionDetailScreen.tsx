import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TransactionsParamList } from '@/navigation/types';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';

 type Route = RouteProp<TransactionsParamList, 'TransactionDetail'>;

export const TransactionDetailScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { transactions } = usePaymentsStore();
  const transaction = transactions.find((item) => item.id === params.id);
  const theme = useTheme();

  if (!transaction) {
    return (
      <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Transaction not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>{transaction.description}</Text>
      <Text style={{ color: theme.muted }}>Status: {transaction.status}</Text>
      <Text style={{ color: theme.text, marginTop: 8 }}>{formatNGN(transaction.amount)}</Text>
      <Text style={{ color: theme.muted }}>Reference: {transaction.reference}</Text>
      <Text style={{ color: theme.muted }}>Timestamp: {new Date(transaction.createdAt).toLocaleString()}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 }
});
