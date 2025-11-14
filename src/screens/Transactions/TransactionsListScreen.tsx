import React from 'react';
import { ScrollView } from 'react-native';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { PaymentListItem } from '@/components/PaymentListItem';

export const TransactionsListScreen: React.FC = () => {
  const { transactions } = usePaymentsStore();

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {transactions.map((transaction) => (
        <PaymentListItem key={transaction.id} transaction={transaction} />
      ))}
    </ScrollView>
  );
};
