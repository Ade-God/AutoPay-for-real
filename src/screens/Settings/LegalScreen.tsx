import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

export const LegalScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.heading, { color: theme.text }]}>Terms & Privacy</Text>
      <Text style={{ color: theme.muted }}>
        By using AutoPay you agree to our terms of service and privacy policy. AutoPay securely handles your
        information and will request explicit consent before sharing data with third parties. Replace this text with your
        final legal copy.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 12 }
});
