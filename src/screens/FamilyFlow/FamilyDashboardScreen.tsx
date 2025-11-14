import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useTheme } from '@/utils/theme';
import { formatNGN } from '@/utils/currency';

export const FamilyDashboardScreen: React.FC = () => {
  const { wallets } = useFamilyStore();
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {wallets.map((wallet) => (
        <View key={wallet.id} style={[styles.card, { backgroundColor: theme.card }]}> 
          <Text style={[styles.title, { color: theme.text }]}>{wallet.name}</Text>
          <Text style={{ color: theme.muted }}>Balance</Text>
          <Text style={[styles.balance, { color: theme.text }]}>{formatNGN(wallet.balance)}</Text>
          <Text style={{ color: theme.muted }}>{wallet.members.length} members</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  balance: { fontSize: 16, fontWeight: '600', marginBottom: 8 }
});
