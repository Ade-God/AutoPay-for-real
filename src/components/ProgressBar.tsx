import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface ProgressBarProps {
  progress: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  const theme = useTheme();
  const width = Math.max(0, Math.min(1, progress)) * 100;
  return (
    <View style={[styles.container, { backgroundColor: theme.border }]}
      accessibilityRole="progressbar"
      accessibilityValue={{ now: Math.round(width), min: 0, max: 100 }}
    >
      <View style={[styles.bar, { width: `${width}%`, backgroundColor: color || theme.primary }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden'
  },
  bar: {
    height: 8,
    borderRadius: 4
  }
});
