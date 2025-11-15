import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addBillDetailsSchema, AddBillDetailsFormValues } from '@/utils/validation';
import { FormTextInput } from '@/components/FormTextInput';
import { FormAmountInput } from '@/components/FormAmountInput';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddBillStackParamList } from '@/navigation/types';
import { useBillsStore } from '@/store/useBillsStore';
import { useTheme } from '@/utils/theme';

type Nav = NativeStackNavigationProp<AddBillStackParamList>;

type Route = RouteProp<AddBillStackParamList, 'AddBillDetails'>;

export const AddBillDetailsScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const { providers } = useBillsStore();
  const theme = useTheme();
  const provider = providers.find((item) => item.id === params.providerId);

  const { control, handleSubmit } = useForm<AddBillDetailsFormValues>({
    resolver: zodResolver(addBillDetailsSchema),
    defaultValues: { accountRef: '', phone: '', amount: 0 }
  });

  const onSubmit = (values: AddBillDetailsFormValues) => {
    navigation.navigate('AddBillSchedule', {
      providerId: params.providerId,
      accountRef: values.accountRef,
      amount: values.amount
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>{provider?.name}</Text>
      <FormTextInput
        control={control}
        name="accountRef"
        label={provider?.accountLabel ?? 'Account reference'}
        placeholder={provider?.accountLabel}
      />
      <FormTextInput control={control} name="phone" label="Phone (optional)" placeholder="0803" keyboardType="phone-pad" />
      <FormAmountInput control={control} name="amount" label="Amount (₦)" placeholder="1000" />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Continue to schedule"
      >
        <Text style={styles.buttonText}>Continue</Text>
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
