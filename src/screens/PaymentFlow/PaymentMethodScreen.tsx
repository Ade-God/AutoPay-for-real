import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentFlowParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<PaymentFlowParamList>;

export const PaymentMethodScreen: React.FC = () => {
  const { methods, quickPayDraft, setQuickPayDraft } = usePaymentsStore();
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {methods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.card, { backgroundColor: theme.card }]}
          onPress={() => {
            setQuickPayDraft({ ...quickPayDraft, methodId: method.id });
            navigation.navigate('PaymentConfirm', {
              provider: quickPayDraft.provider ?? '',
              amount: quickPayDraft.amount ?? 0,
              methodId: method.id,
              memo: quickPayDraft.memo
            });
          }}
          accessibilityRole="button"
          accessibilityLabel={`Select ${method.label}`}
        >
          <Text style={[styles.label, { color: theme.text }]}>{method.label}</Text>
          <Text style={{ color: theme.muted }}>{method.type}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { padding: 16, borderRadius: 16, marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '600' }
});
