import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/FormTextInput';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '@/navigation/types';
import { useTheme } from '@/utils/theme';

 type Nav = NativeStackNavigationProp<OnboardingStackParamList>;

interface FormValues {
  otp: string;
}

export const VerifyOTPScreen: React.FC = () => {
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { otp: '' } });
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  const onSubmit = () => {
    navigation.navigate('CreatePIN');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Enter the OTP sent to you</Text>
      <FormTextInput control={control} name="otp" label="OTP" placeholder="123456" keyboardType="number-pad" />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Verify"
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  button: { marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
