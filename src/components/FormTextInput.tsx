import React from 'react';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { TextInput, View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/utils/theme';

interface FormTextInputProps<T extends FieldValues> extends TextInputProps {
  name: string;
  control: Control<T>;
  label: string;
}

export const FormTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  ...rest
}: FormTextInputProps<T>) => {
  const theme = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <View style={styles.container}>
          <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
          <TextInput
            style={[styles.input, { borderColor: theme.border, color: theme.text }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={(value as string) ?? ''}
            placeholderTextColor={theme.muted}
            accessibilityLabel={label}
            {...rest}
          />
          {fieldState.error && (
            <Text style={[styles.error, { color: theme.danger }]}>{fieldState.error.message}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    marginBottom: 6,
    fontSize: 12,
    fontWeight: '500'
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16
  },
  error: {
    marginTop: 4,
    fontSize: 12
  }
});
