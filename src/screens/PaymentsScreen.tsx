import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quickPaySchema, QuickPayFormValues } from '@/utils/validation';
import { FormTextInput } from '@/components/FormTextInput';
import { FormAmountInput } from '@/components/FormAmountInput';
import { Select } from '@/components/Select';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@/utils/theme';
import { PaymentListItem } from '@/components/PaymentListItem';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EmptyState } from '@/components/EmptyState';

const tabs = ['Quick Pay', 'Scheduled', 'History'] as const;

type TabKey = typeof tabs[number];

export const PaymentsScreen: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>('Quick Pay');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { methods, transactions, setQuickPayDraft } = usePaymentsStore();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting }
  } = useForm<QuickPayFormValues>({
    resolver: zodResolver(quickPaySchema),
    defaultValues: { provider: '', amount: 0, methodId: methods[0]?.id ?? '', memo: '' }
  });

  const onSubmit = (values: QuickPayFormValues) => {
    setQuickPayDraft(values);
    navigation.navigate('QuickPayFlow');
  };

  const scheduled = transactions.filter((tx) => tx.status === 'Pending');

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && { borderBottomColor: theme.primary }]}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab }}
          >
            <Text style={{ color: activeTab === tab ? theme.primary : theme.muted, fontWeight: '600' }}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'Quick Pay' ? (
        <View style={[styles.card, { backgroundColor: theme.card }]}> 
          <Text style={[styles.cardTitle, { color: theme.text }]}>Pay instantly</Text>
          <FormTextInput control={control} name="provider" label="Provider or recipient" placeholder="e.g. PHCN" />
          <FormAmountInput control={control} name="amount" label="Amount (₦)" placeholder="5000" />
          <Select
            label="Method"
            value={watch('methodId') || ''}
            options={methods.map((method) => ({ label: method.label, value: method.id }))}
            onSelect={(value) => setValue('methodId', value, { shouldDirty: true })}
          />
          <FormTextInput control={control} name="memo" label="Memo" placeholder="Optional note" />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.submit, { backgroundColor: theme.primary }]}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Submit quick payment"
          >
            <Text style={styles.submitText}>{isSubmitting ? 'Processing...' : 'Review payment'}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {activeTab === 'Scheduled' ? (
        <View>
          {scheduled.length === 0 ? (
            <EmptyState title="No scheduled payments" description="Create an AutoPay schedule to see it here." />
          ) : (
            scheduled.map((transaction) => <PaymentListItem key={transaction.id} transaction={transaction} />)
          )}
        </View>
      ) : null}
      {activeTab === 'History' ? (
        <View>
          {transactions.length === 0 ? (
            <EmptyState title="No payment history yet" />
          ) : (
            transactions.map((transaction) => <PaymentListItem key={transaction.id} transaction={transaction} />)
          )}
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: 20,
    paddingBottom: 120
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc'
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  card: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  submit: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  submitText: {
    color: '#fff',
    fontWeight: '600'
  }
});
