import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@/utils/theme';
import { Transaction } from '@/store/types';
import { formatNGN } from '@/utils/currency';
import { addDays } from '@/utils/dates';

interface UpcomingPaymentsCardProps {
  upcoming: Transaction[];
}

export const UpcomingPaymentsCard: React.FC<UpcomingPaymentsCardProps> = ({ upcoming }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}
      accessible
      accessibilityLabel="Upcoming payments"
    >
      <Text style={[styles.title, { color: theme.text }]}>Upcoming Payments</Text>
      <FlatList
        data={upcoming}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={[styles.provider, { color: theme.text }]}>{item.description}</Text>
              <Text style={[styles.subtitle, { color: theme.muted }]}>Due {new Date(addDays(item.createdAt, 3)).toLocaleDateString()}</Text>
            </View>
            <Text style={[styles.amount, { color: theme.text }]}>{formatNGN(item.amount)}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={[styles.divider, { backgroundColor: theme.border }]} />}
        ListEmptyComponent={<Text style={[styles.subtitle, { color: theme.muted }]}>No scheduled payments</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
  provider: {
    fontSize: 14,
    fontWeight: '500'
  },
  subtitle: {
    fontSize: 12
  },
  amount: {
    fontSize: 14,
    fontWeight: '600'
  },
  divider: {
    height: StyleSheet.hairlineWidth
  }
});
