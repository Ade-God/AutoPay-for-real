import React, { useMemo, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBillsStore } from '@/store/useBillsStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { BillListItem } from '@/components/BillListItem';
import { EmptyState } from '@/components/EmptyState';

const tabs = ['Scheduled', 'All', 'Categories'] as const;

type TabKey = typeof tabs[number];

export const BillsScreen: React.FC = () => {
  const theme = useTheme();
  const { bills, providers, toggleBill } = useBillsStore();
  const { methods } = usePaymentsStore();
  const [activeTab, setActiveTab] = useState<TabKey>('Scheduled');

  const scheduled = bills.filter((bill) => bill.active);

  const categories = useMemo(() => {
    const map = new Map<string, number>();
    bills.forEach((bill) => {
      const provider = providers.find((item) => item.id === bill.providerId);
      if (!provider) return;
      map.set(provider.category, (map.get(provider.category) ?? 0) + 1);
    });
    return Array.from(map.entries());
  }, [bills, providers]);

  const methodLabel = (methodId: string) => methods.find((method) => method.id === methodId)?.label ?? 'Wallet';
  const providerName = (providerId: string) => providers.find((provider) => provider.id === providerId)?.name ?? 'Provider';

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
      {activeTab === 'Scheduled' ? (
        <View>
          {scheduled.length === 0 ? (
            <EmptyState title="No scheduled bills" description="Create an AutoPay bill to see it here." />
          ) : (
            scheduled.map((bill) => (
              <BillListItem
                key={bill.id}
                bill={bill}
                providerName={providerName(bill.providerId)}
                paymentMethodLabel={methodLabel(bill.methodId)}
                onToggle={(id) => toggleBill(id)}
              />
            ))
          )}
        </View>
      ) : null}
      {activeTab === 'All' ? (
        <View>
          {bills.length === 0 ? (
            <EmptyState title="No bills yet" />
          ) : (
            bills.map((bill) => (
              <BillListItem
                key={bill.id}
                bill={bill}
                providerName={providerName(bill.providerId)}
                paymentMethodLabel={methodLabel(bill.methodId)}
                onToggle={(id) => toggleBill(id)}
              />
            ))
          )}
        </View>
      ) : null}
      {activeTab === 'Categories' ? (
        <View style={[styles.categoryCard, { backgroundColor: theme.card }]}> 
          {categories.map(([category, count]) => (
            <View key={category} style={styles.categoryRow}>
              <Text style={[styles.categoryName, { color: theme.text }]}>{category}</Text>
              <Text style={[styles.categoryCount, { color: theme.muted }]}>{count} bills</Text>
            </View>
          ))}
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
  categoryCard: {
    marginTop: 20,
    borderRadius: 16,
    padding: 16
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600'
  },
  categoryCount: {
    fontSize: 12
  }
});
