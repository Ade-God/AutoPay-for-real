import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BudgetFlowParamList } from '@/navigation/types';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useTheme } from '@/utils/theme';
import { FormAmountInput } from '@/components/FormAmountInput';
import { useForm } from 'react-hook-form';

 type Route = RouteProp<BudgetFlowParamList, 'CategoryDetail'>;

interface FormValues {
  monthlyLimit: number;
}

export const CategoryDetailScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { categories, updateCategory } = useBudgetStore();
  const category = categories.find((item) => item.id === params.categoryId);
  const theme = useTheme();
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { monthlyLimit: category?.monthlyLimit ?? 0 } });

  if (!category) {
    return (
      <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Category not found.</Text>
      </ScrollView>
    );
  }

  const onSubmit = (values: FormValues) => {
    updateCategory({ ...category, monthlyLimit: values.monthlyLimit });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>{category.name}</Text>
      <Text style={{ color: theme.muted }}>Spent: ₦{category.spentThisMonth.toLocaleString()}</Text>
      <FormAmountInput control={control} name="monthlyLimit" label="Monthly limit" placeholder="50000" />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Update limit"
      >
        <Text style={styles.buttonText}>Update limit</Text>
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
