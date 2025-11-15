import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PINPad } from '@/components/PINPad';
import { useTheme } from '@/utils/theme';
import { savePin } from '@/services/security';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/useAuthStore';

 type Nav = NativeStackNavigationProp<OnboardingStackParamList>;

export const CreatePINScreen: React.FC = () => {
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('Enter a 4-digit PIN');
  const theme = useTheme();
  const navigation = useNavigation<Nav>();
  const { setPinSet } = useAuthStore();

  const handleChange = async (value: string) => {
    setPin(value);
    if (value.length === 4) {
      await savePin(value);
      setPinSet(true);
      setMessage('PIN saved');
      navigation.navigate('EnableBiometric');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}
      accessible
      accessibilityLabel="Create security PIN"
    >
      <Text style={[styles.title, { color: theme.text }]}>{message}</Text>
      <PINPad value={pin} onChange={handleChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 24 }
});
