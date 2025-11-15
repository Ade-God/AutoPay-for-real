import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/utils/theme';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const theme = useTheme();
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={[styles.message, { color: theme.danger }]}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity
          onPress={onRetry}
          style={[styles.button, { backgroundColor: theme.primary }]}
          accessibilityRole="button"
          accessibilityLabel="Retry"
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Retry</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24
  },
  message: {
    fontSize: 14,
    textAlign: 'center'
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600'
  }
});
