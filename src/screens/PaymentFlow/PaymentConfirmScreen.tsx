import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentFlowParamList } from '@/navigation/types';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';
import { PAYMENT_FEE } from '@/utils/constants';
import { trackEvent } from '@/utils/analytics';

type Nav = NativeStackNavigationProp<PaymentFlowParamList>;

type Route = RouteProp<PaymentFlowParamList, 'PaymentConfirm'>;

export const PaymentConfirmScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { methods, setLastReceipt, setTransactions, transactions } = usePaymentsStore();
  const theme = useTheme();
  const method = methods.find((item) => item.id === params.methodId);

  const total = params.amount + PAYMENT_FEE;

  const onConfirm = () => {
    // TODO: integrate with Go backend - execute payment confirmation
    const transaction = {
      id: `tx_${Date.now()}`,
      description: params.provider,
      amount: params.amount,
      status: 'Success' as const,
      providerId: undefined,
      billId: undefined,
      createdAt: new Date().toISOString(),
      methodId: params.methodId,
      reference: `AP-${Date.now()}`,
      currency: 'NGN' as const,
      fees: PAYMENT_FEE
    };
    setLastReceipt(transaction);
    setTransactions([transaction, ...transactions]);
    trackEvent('payment_success', { provider: params.provider, amount: params.amount });
    navigation.navigate('PaymentReceipt', { transactionId: transaction.id });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <View style={[styles.card, { backgroundColor: theme.card }]}> 
        <Text style={[styles.title, { color: theme.text }]}>Confirm payment</Text>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Provider</Text>
          <Text style={{ color: theme.text }}>{params.provider}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Amount</Text>
          <Text style={{ color: theme.text }}>{formatNGN(params.amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Fees</Text>
          <Text style={{ color: theme.text }}>{formatNGN(PAYMENT_FEE)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Total</Text>
          <Text style={{ color: theme.text }}>{formatNGN(total)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Method</Text>
          <Text style={{ color: theme.text }}>{method?.label}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={onConfirm}
        accessibilityRole="button"
        accessibilityLabel="Confirm payment"
      >
        <Text style={styles.buttonText}>Pay ₦{params.amount.toLocaleString()}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  button: { paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
