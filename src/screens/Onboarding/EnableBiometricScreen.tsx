import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/utils/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/useAuthStore';
import { saveBiometricToken } from '@/services/security';

 type Nav = NativeStackNavigationProp<OnboardingStackParamList>;

export const EnableBiometricScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { setBiometricEnabled } = useAuthStore();

  const handleEnable = async () => {
    setBiometricEnabled(true);
    await saveBiometricToken('mock-token');
    navigation.navigate('ConnectBankIntro');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}
      accessible
      accessibilityLabel="Enable biometrics"
    >
      <Text style={[styles.title, { color: theme.text }]}>Enable biometrics</Text>
      <Text style={{ color: theme.muted, textAlign: 'center' }}>
        Use Face ID or fingerprint for quick approvals.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleEnable}
        accessibilityRole="button"
        accessibilityLabel="Enable biometrics"
      >
        <Text style={styles.buttonText}>Enable</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: 16, backgroundColor: theme.card }]}
        onPress={() => navigation.navigate('ConnectBankIntro')}
        accessibilityRole="button"
        accessibilityLabel="Skip"
      >
        <Text style={{ color: theme.text }}>Skip for now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  button: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 24, marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: '600' }
});
