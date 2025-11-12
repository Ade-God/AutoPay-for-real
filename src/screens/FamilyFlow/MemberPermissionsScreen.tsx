import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Toggle } from '@/components/Toggle';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useTheme } from '@/utils/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FamilyFlowParamList } from '@/navigation/types';
import { trackEvent } from '@/utils/analytics';

type Route = RouteProp<FamilyFlowParamList, 'MemberPermissions'>;

export const MemberPermissionsScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { wallets, updateWallet } = useFamilyStore();
  const theme = useTheme();
  const wallet = wallets.find((item) => item.id === params.walletId);
  const member = wallet?.members.find((item) => item.id === params.memberId);

  const setRole = (role: 'Admin' | 'Contributor' | 'Viewer') => {
    if (!wallet || !member) return;
    // TODO: integrate with Go backend - update member permissions
    updateWallet({
      ...wallet,
      members: wallet.members.map((item) =>
        item.id === member.id ? { ...item, role } : item
      )
    });
    trackEvent('family_member_role_updated', { memberId: member.id, role });
  };

  if (!member) {
    return (
      <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Member not found.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>{member.name}</Text>
      <Toggle
        label="Admin"
        value={member.role === 'Admin'}
        onValueChange={(value) => value && setRole('Admin')}
      />
      <Toggle
        label="Contributor"
        value={member.role === 'Contributor'}
        onValueChange={(value) => value && setRole('Contributor')}
      />
      <Toggle label="Viewer" value={member.role === 'Viewer'} onValueChange={(value) => value && setRole('Viewer')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 }
});
