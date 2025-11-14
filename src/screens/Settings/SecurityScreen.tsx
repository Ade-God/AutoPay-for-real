import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Toggle } from '@/components/Toggle';
import { useAuthStore } from '@/store/useAuthStore';
import { useTheme } from '@/utils/theme';
import { savePin, deletePin, saveBiometricToken, deleteBiometricToken } from '@/services/security';
import { PINPad } from '@/components/PINPad';

export const SecurityScreen: React.FC = () => {
  const { biometricEnabled, setBiometricEnabled, pinSet, setPinSet } = useAuthStore();
  const theme = useTheme();
  const [creatingPin, setCreatingPin] = useState(false);
  const [pin, setPin] = useState('');

  const handleToggleBiometric = async (value: boolean) => {
    setBiometricEnabled(value);
    if (value) {
      await saveBiometricToken('mock-token');
    } else {
      await deleteBiometricToken();
    }
  };

  const handleRemovePin = async () => {
    await deletePin();
    setPinSet(false);
  };

  const handlePinChange = async (value: string) => {
    setPin(value);
    if (value.length === 4) {
      await savePin(value);
      setPinSet(true);
      setCreatingPin(false);
      setPin('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Security</Text>
      <Toggle label="Biometric authentication" value={biometricEnabled} onValueChange={handleToggleBiometric} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => setCreatingPin(true)}
        accessibilityRole="button"
        accessibilityLabel="Set PIN"
      >
        <Text style={styles.buttonText}>{pinSet ? 'Change PIN' : 'Set PIN'}</Text>
      </TouchableOpacity>
      {pinSet ? (
        <TouchableOpacity onPress={handleRemovePin} style={styles.link} accessibilityRole="button" accessibilityLabel="Remove PIN">
          <Text style={{ color: theme.danger }}>Remove PIN</Text>
        </TouchableOpacity>
      ) : null}
      {creatingPin ? (
        <PINPad value={pin} onChange={handlePinChange} />
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  button: { marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  link: { marginTop: 12 }
});
