import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '@/navigation/types';
import { useTheme } from '@/utils/theme';

 type Nav = NativeStackNavigationProp<OnboardingStackParamList>;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}
      accessible
      accessibilityLabel="Welcome to AutoPay"
    >
      <Text style={[styles.title, { color: theme.text }]}>Welcome to AutoPay</Text>
      <Text style={[styles.subtitle, { color: theme.muted }]}>Automate your bills and stay on top of spending.</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('Signup')}
        accessibilityRole="button"
        accessibilityLabel="Get started"
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
  button: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24 },
  buttonText: { color: '#fff', fontWeight: '600' }
});
