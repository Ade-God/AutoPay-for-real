import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message }) => {
  const theme = useTheme();
  return (
    <View style={styles.container} accessibilityRole="progressbar">
      <ActivityIndicator color={theme.primary} size="large" />
      {message ? <Text style={[styles.message, { color: theme.muted }]}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24
  },
  message: {
    marginTop: 8,
    fontSize: 14
  }
});
