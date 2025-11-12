import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useTheme } from '@/utils/theme';
import { trackEvent } from '@/utils/analytics';

export const PaymentMethodsScreen: React.FC = () => {
  const { methods } = usePaymentsStore();
  const theme = useTheme();

  const handleAddMethod = () => {
    // TODO: integrate with Go backend - add new payment method
    trackEvent('payment_method_add_initiated');
    Alert.alert('Coming soon', 'Add payment method will connect to Go backend.');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {methods.map((method) => (
        <View key={method.id} style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.label, { color: theme.text }]}>{method.label}</Text>
          <Text style={{ color: theme.muted }}>{method.type}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        accessibilityRole="button"
        accessibilityLabel="Add method"
        onPress={handleAddMethod}
      >
        <Text style={styles.buttonText}>Add method</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '600' },
  button: { marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
