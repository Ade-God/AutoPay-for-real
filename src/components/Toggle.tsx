import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface ToggleProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, value, onValueChange, description }) => {
  const theme = useTheme();
  return (
    <View style={styles.container} accessibilityRole="switch" accessibilityLabel={label}>
      <View>
        <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
        {description ? (
          <Text style={[styles.description, { color: theme.muted }]}>{description}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? theme.primary : theme.border}
        trackColor={{ true: theme.primary, false: theme.border }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12
  },
  label: {
    fontSize: 14,
    fontWeight: '600'
  },
  description: {
    marginTop: 4,
    fontSize: 12
  }
});
