import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Keypad } from './Keypad';
import { useTheme } from '@/utils/theme';

interface PINPadProps {
  value: string;
  onChange: (value: string) => void;
}

export const PINPad: React.FC<PINPadProps> = ({ value, onChange }) => {
  const theme = useTheme();

  const handlePress = (digit: string) => {
    if (value.length >= 4) return;
    onChange(`${value}${digit}`);
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <View>
      <View style={styles.dots} accessibilityLabel={`PIN entry ${value.length} digits`}>
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[styles.dot, { borderColor: theme.primary, backgroundColor: value[index] ? theme.primary : 'transparent' }]}
          />
        ))}
      </View>
      <Keypad onPress={handlePress} onDelete={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2
  }
});
