import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddBillStackParamList } from '@/navigation/types';
import { useBillsStore } from '@/store/useBillsStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';
import { trackEvent } from '@/utils/analytics';

type Nav = NativeStackNavigationProp<AddBillStackParamList>;

type Route = RouteProp<AddBillStackParamList, 'AddBillConfirm'>;

export const AddBillConfirmScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const { providers, addBill } = useBillsStore();
  const { methods } = usePaymentsStore();
  const theme = useTheme();

  const provider = providers.find((item) => item.id === params.providerId);
  const method = methods[0];

  const onConfirm = () => {
    // TODO: integrate with Go backend - create bill on server
    addBill({
      id: `bill_${Date.now()}`,
      providerId: params.providerId,
      accountRef: params.accountRef,
      nickname: provider?.name,
      amount: params.amount,
      currency: 'NGN',
      frequency: 'Monthly',
      nextRunAt: new Date().toISOString(),
      methodId: method?.id ?? 'pm_wallet_default',
      active: true
    });
    trackEvent('bill_added', { provider: provider?.name });
    navigation.popToTop();
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <View style={[styles.card, { backgroundColor: theme.card }]}> 
        <Text style={[styles.title, { color: theme.text }]}>Confirm bill</Text>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Provider</Text>
          <Text style={{ color: theme.text }}>{provider?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Account</Text>
          <Text style={{ color: theme.text }}>{params.accountRef}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Amount</Text>
          <Text style={{ color: theme.text }}>{formatNGN(params.amount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ color: theme.muted }}>Schedule</Text>
          <Text style={{ color: theme.text }}>{params.schedule}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={onConfirm}
        accessibilityRole="button"
        accessibilityLabel="Confirm bill"
      >
        <Text style={styles.buttonText}>Add bill</Text>
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
