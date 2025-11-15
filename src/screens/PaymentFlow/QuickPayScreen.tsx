import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quickPaySchema, QuickPayFormValues } from '@/utils/validation';
import { FormTextInput } from '@/components/FormTextInput';
import { FormAmountInput } from '@/components/FormAmountInput';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PaymentFlowParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<PaymentFlowParamList>;

export const QuickPayScreen: React.FC = () => {
  const { methods, setQuickPayDraft } = usePaymentsStore();
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  const { control, handleSubmit, setValue, watch } = useForm<QuickPayFormValues>({
    resolver: zodResolver(quickPaySchema),
    defaultValues: { provider: '', amount: 0, methodId: methods[0]?.id ?? '', memo: '' }
  });

  const onSubmit = (values: QuickPayFormValues) => {
    setQuickPayDraft(values);
    navigation.navigate('PaymentConfirm', values);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Who are you paying?</Text>
      <FormTextInput control={control} name="provider" label="Provider" placeholder="Start typing" />
      <FormAmountInput control={control} name="amount" label="Amount (₦)" placeholder="5000" />
      <FormTextInput control={control} name="memo" label="Memo" placeholder="Optional memo" />
      <Text style={[styles.subtitle, { color: theme.muted }]}>Method</Text>
      {methods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.method, { borderColor: watch('methodId') === method.id ? theme.primary : theme.border }]}
          onPress={() => setValue('methodId', method.id, { shouldDirty: true })}
          accessibilityRole="button"
          accessibilityLabel={`Pay with ${method.label}`}
        >
          <Text style={{ color: theme.text }}>{method.label}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Continue to confirm"
      >
        <Text style={styles.buttonText}>Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  subtitle: { marginTop: 16, marginBottom: 8 },
  method: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12
  },
  button: { marginTop: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
