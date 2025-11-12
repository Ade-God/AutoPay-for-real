import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface KeypadProps {
  onPress: (value: string) => void;
  onDelete: () => void;
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0'];

export const Keypad: React.FC<KeypadProps> = ({ onPress, onDelete }) => {
  const theme = useTheme();
  return (
    <View style={styles.grid}
      accessibilityRole="keyboard"
    >
      {keys.map((key) => (
        <TouchableOpacity
          key={key}
          style={[styles.key, { backgroundColor: theme.card }]}
          onPress={() => (key === 'del' ? onDelete() : onPress(key))}
          accessibilityLabel={key === 'del' ? 'Delete' : `Key ${key}`}
          accessibilityRole="button"
        >
          <Text style={[styles.keyText, { color: theme.text }]}>{key === 'del' ? '⌫' : key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  key: {
    width: '30%',
    marginVertical: 8,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  keyText: {
    fontSize: 20,
    fontWeight: '600'
  }
});
