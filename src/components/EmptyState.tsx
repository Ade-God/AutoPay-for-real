import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  const theme = useTheme();
  return (
    <View style={styles.container} accessibilityRole="text">
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {description ? (
        <Text style={[styles.description, { color: theme.muted }]}>{description}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24
  },
  title: {
    fontSize: 16,
    fontWeight: '600'
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center'
  }
});
