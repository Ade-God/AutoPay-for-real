import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/utils/theme';

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
}

export const Radio: React.FC<RadioProps> = ({ options, value, onChange }) => {
  const theme = useTheme();
  return (
    <View accessibilityRole="radiogroup">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.option, { borderColor: selected ? theme.primary : theme.border }]}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={option.label}
          >
            <View style={[styles.indicator, { borderColor: theme.primary }]}> 
              {selected ? <View style={[styles.dot, { backgroundColor: theme.primary }]} /> : null}
            </View>
            <View style={styles.content}>
              <Text style={[styles.label, { color: theme.text }]}>{option.label}</Text>
              {option.description ? (
                <Text style={[styles.description, { color: theme.muted }]}>{option.description}</Text>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  content: {
    marginLeft: 12
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
