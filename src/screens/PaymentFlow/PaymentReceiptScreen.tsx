import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentFlowParamList } from '@/navigation/types';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { ReceiptCard } from '@/components/ReceiptCard';

 type Nav = NativeStackNavigationProp<PaymentFlowParamList>;

type Route = RouteProp<PaymentFlowParamList, 'PaymentReceipt'>;

export const PaymentReceiptScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { transactions } = usePaymentsStore();
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const transaction = transactions.find((item) => item.id === params.transactionId);

  if (!transaction) {
    return (
      <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Receipt not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <ReceiptCard transaction={transaction} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.popToTop()}
        accessibilityRole="button"
        accessibilityLabel="Done"
      >
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  button: { marginTop: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
