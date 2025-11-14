import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBanksStore } from '@/store/useBanksStore';
import { useTheme } from '@/utils/theme';
import { beginBankLink, revokeBankAccess } from '@/services/openBanking';
import { useSyncIndicator } from '@/hooks/useSyncIndicator';
import { trackEvent } from '@/utils/analytics';

export const ConnectedBanksScreen: React.FC = () => {
  const { linkedBanks, addLinkedBank, removeLinkedBank, setSyncing, syncingBankIds } = useBanksStore();
  const theme = useTheme();
  const { visible, lastSynced } = useSyncIndicator();

  const handleConnect = async () => {
    // TODO: integrate with Go backend (open banking link)
    await beginBankLink('mock');
    const newBank = {
      id: `bank_${Date.now()}`,
      name: 'New Bank',
      provider: 'mock' as const,
      lastSyncedAt: new Date().toISOString(),
      connectedAt: new Date().toISOString()
    };
    addLinkedBank(newBank);
    trackEvent('bank_linked', { bankId: newBank.id });
  };

  const handleRevoke = async (bankId: string) => {
    setSyncing(bankId, true);
    // TODO: integrate with Go backend (revoke bank access)
    await revokeBankAccess(bankId);
    removeLinkedBank(bankId);
    setSyncing(bankId, false);
    trackEvent('bank_unlinked', { bankId });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {visible && lastSynced ? (
        <Text style={{ color: theme.muted, marginBottom: 8 }}>Last synced {new Date(lastSynced).toLocaleString()}</Text>
      ) : null}
      {linkedBanks.map((bank) => (
        <View key={bank.id} style={[styles.card, { backgroundColor: theme.card }]}> 
          <Text style={[styles.label, { color: theme.text }]}>{bank.name}</Text>
          <Text style={{ color: theme.muted }}>Last synced {new Date(bank.lastSyncedAt).toLocaleString()}</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.danger }]}
            onPress={() => handleRevoke(bank.id)}
            accessibilityRole="button"
            accessibilityLabel={`Disconnect ${bank.name}`}
            disabled={syncingBankIds.includes(bank.id)}
          >
            <Text style={styles.buttonText}>{syncingBankIds.includes(bank.id) ? 'Revoking...' : 'Disconnect'}</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleConnect}
        accessibilityRole="button"
        accessibilityLabel="Connect bank"
      >
        <Text style={styles.buttonText}>Connect bank</Text>
      </TouchableOpacity>
      <Text style={[styles.note, { color: theme.muted }]}>
        AutoPay uses read-only access to view balances and transactions. We cannot move funds.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '600' },
  button: { marginTop: 12, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  note: { marginTop: 16, fontSize: 12 }
});
