import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

const FAQ = [
  {
    question: 'How does AutoPay work?',
    answer: 'AutoPay schedules your bills and payments so they run automatically on your chosen dates.'
  },
  {
    question: 'Can I cancel a scheduled payment?',
    answer: 'Yes, open the bill detail screen and pause or cancel the schedule at any time.'
  },
  {
    question: 'Is my bank data safe?',
    answer: 'We use secure open banking providers and store sensitive tokens securely using the device keychain.'
  }
];

export const HelpCenterScreen: React.FC = () => {
  const theme = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {FAQ.map((item) => (
        <View key={item.question} style={[styles.card, { backgroundColor: theme.card }]}> 
          <Text style={[styles.question, { color: theme.text }]}>{item.question}</Text>
          <Text style={{ color: theme.muted }}>{item.answer}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 12 },
  question: { fontSize: 16, fontWeight: '600', marginBottom: 8 }
});
