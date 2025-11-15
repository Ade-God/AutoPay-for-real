import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/FormTextInput';
import { FormAmountInput } from '@/components/FormAmountInput';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useTheme } from '@/utils/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BudgetFlowParamList } from '@/navigation/types';
import { trackEvent } from '@/utils/analytics';

type Nav = NativeStackNavigationProp<BudgetFlowParamList>;

interface FormValues {
  name: string;
  monthlyLimit: number;
}

export const CreateBudgetScreen: React.FC = () => {
  const { setCategories, categories } = useBudgetStore();
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { name: '', monthlyLimit: 0 } });
  const theme = useTheme();
  const navigation = useNavigation<Nav>();

  const onSubmit = (values: FormValues) => {
    const next = [
      ...categories,
      {
        id: `bc_${Date.now()}`,
        name: values.name,
        monthlyLimit: values.monthlyLimit,
        spentThisMonth: 0,
        alert80: true,
        alert90: false
      }
    ];
    // TODO: integrate with Go backend - persist budget category
    setCategories(next);
    trackEvent('budget_created', { name: values.name, limit: values.monthlyLimit });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Create budget</Text>
      <FormTextInput control={control} name="name" label="Category name" placeholder="e.g. Groceries" />
      <FormAmountInput control={control} name="monthlyLimit" label="Monthly limit (₦)" placeholder="100000" />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Create budget"
      >
        <Text style={styles.buttonText}>Save</Text>
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
