import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';

interface BalanceCardProps {
  balance: number;
  masked: boolean;
  onToggleMask: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance, masked, onToggleMask }) => {
  const theme = useTheme();
  const animation = React.useRef(new Animated.Value(masked ? 0 : 1)).current;

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: masked ? 0 : 1,
      duration: 200,
      useNativeDriver: true
    }).start();
  }, [masked, animation]);

  const opacity = animation.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}> 
      <Text style={[styles.label, { color: theme.muted }]}>Total Balance</Text>
      <TouchableOpacity
        onPress={onToggleMask}
        accessibilityRole="button"
        accessibilityLabel={masked ? 'Reveal total balance' : 'Hide total balance'}
        style={styles.balanceRow}
      >
        {masked ? (
          <Text style={[styles.masked, { color: theme.muted }]}>••••••</Text>
        ) : (
          <Animated.Text style={[styles.amount, { color: theme.text, opacity }]}> 
            {formatNGN(balance)}
          </Animated.Text>
        )}
      </TouchableOpacity>
      <Text style={[styles.sub, { color: theme.muted }]}>Tap to toggle visibility</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '500'
  },
  balanceRow: {
    marginTop: 12
  },
  amount: {
    fontSize: 32,
    fontWeight: '700'
  },
  masked: {
    fontSize: 32,
    letterSpacing: 6
  },
  sub: {
    marginTop: 8,
    fontSize: 12
  }
});
