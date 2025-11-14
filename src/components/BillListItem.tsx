import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Bill } from '@/store/types';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';

interface BillListItemProps {
  bill: Bill;
  providerName: string;
  paymentMethodLabel: string;
  onToggle: (id: string, active: boolean) => void;
}

export const BillListItem: React.FC<BillListItemProps> = ({
  bill,
  providerName,
  paymentMethodLabel,
  onToggle
}) => {
  const theme = useTheme();
  const handleToggle = (value: boolean) => onToggle(bill.id, value);
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}
      accessible
      accessibilityRole="switch"
      accessibilityState={{ checked: bill.active }}
      accessibilityLabel={`${providerName} bill toggle`}
    >
      <View style={styles.row}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>{providerName}</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>Next run {new Date(bill.nextRunAt).toLocaleDateString()} • {paymentMethodLabel}</Text>
        </View>
        <Switch
          value={bill.active}
          onValueChange={handleToggle}
          thumbColor={bill.active ? theme.primary : theme.border}
          trackColor={{ true: theme.primary, false: theme.border }}
        />
      </View>
      <Text style={[styles.amount, { color: theme.text }]}>{formatNGN(bill.amount)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12
  }
});
