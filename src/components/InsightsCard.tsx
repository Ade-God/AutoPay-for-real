import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface InsightsCardProps {
  insights: { title: string; description: string }[];
}

export const InsightsCard: React.FC<InsightsCardProps> = ({ insights }) => {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.card }]}> 
      <Text style={[styles.title, { color: theme.text }]}>Insights</Text>
      {insights.map((insight) => (
        <View key={insight.title} style={styles.row}>
          <Text style={[styles.insightTitle, { color: theme.text }]}>{insight.title}</Text>
          <Text style={[styles.description, { color: theme.muted }]}>{insight.description}</Text>
        </View>
      ))}
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
    marginBottom: 12
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '500'
  },
  description: {
    fontSize: 13,
    marginTop: 4
  }
});
