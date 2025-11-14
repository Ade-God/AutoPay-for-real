import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';
import { BudgetCategory } from '@/store/types';
import { ProgressBar } from './ProgressBar';

interface BudgetSnapshotCardProps {
  categories: BudgetCategory[];
}

export const BudgetSnapshotCard: React.FC<BudgetSnapshotCardProps> = ({ categories }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Budget Snapshot</Text>
      {categories.map((category) => {
        const progress = Math.min(category.spentThisMonth / category.monthlyLimit, 1);
        return (
          <View key={category.id} style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={[styles.category, { color: theme.text }]}>{category.name}</Text>
              <Text style={[styles.amount, { color: theme.muted }]}>₦{category.spentThisMonth.toLocaleString()} / ₦{category.monthlyLimit.toLocaleString()}</Text>
            </View>
            <ProgressBar progress={progress} color={progress > 0.9 ? theme.danger : progress > 0.8 ? theme.warning : theme.primary} />
          </View>
        );
      })}
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
    marginBottom: 16
  },
  row: {
    marginBottom: 12
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  category: {
    fontSize: 14,
    fontWeight: '500'
  },
  amount: {
    fontSize: 12
  }
});
