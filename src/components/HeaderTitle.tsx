import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/utils/theme';

interface HeaderTitleProps {
  title: string;
  subtitle?: string;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12
  },
  title: {
    fontSize: 24,
    fontWeight: '700'
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14
  }
});
