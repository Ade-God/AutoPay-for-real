import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/FormTextInput';
import { FormAmountInput } from '@/components/FormAmountInput';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useTheme } from '@/utils/theme';
import { trackEvent } from '@/utils/analytics';

interface FormValues {
  name: string;
  balance: number;
}

export const CreateFamilyWalletScreen: React.FC = () => {
  const { addWallet } = useFamilyStore();
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { name: '', balance: 0 } });
  const theme = useTheme();

  const onSubmit = (values: FormValues) => {
    // TODO: integrate with Go backend - persist family wallet
    addWallet({
      id: `fw_${Date.now()}`,
      name: values.name,
      color: '#3B82F6',
      balance: values.balance,
      members: [],
      sharedBillIds: []
    });
    trackEvent('family_wallet_created', { name: values.name });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Create family wallet</Text>
      <FormTextInput control={control} name="name" label="Wallet name" placeholder="Household" />
      <FormAmountInput control={control} name="balance" label="Starting balance" placeholder="50000" />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Create wallet"
      >
        <Text style={styles.buttonText}>Create wallet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  button: { marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
