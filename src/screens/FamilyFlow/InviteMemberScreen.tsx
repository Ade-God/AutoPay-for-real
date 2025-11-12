import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { FormTextInput } from '@/components/FormTextInput';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useTheme } from '@/utils/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { FamilyFlowParamList } from '@/navigation/types';
import { trackEvent } from '@/utils/analytics';

interface FormValues {
  name: string;
  contact: string;
}

type Route = RouteProp<FamilyFlowParamList, 'InviteMember'>;

export const InviteMemberScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { wallets, updateWallet } = useFamilyStore();
  const wallet = wallets.find((item) => item.id === params.walletId);
  const theme = useTheme();
  const { control, handleSubmit } = useForm<FormValues>({ defaultValues: { name: '', contact: '' } });

  const onSubmit = (values: FormValues) => {
    if (!wallet) return;
    // TODO: integrate with Go backend - send invitation
    updateWallet({
      ...wallet,
      members: [
        ...wallet.members,
        { id: `member_${Date.now()}`, name: values.name, phoneOrEmail: values.contact, role: 'Viewer' }
      ]
    });
    trackEvent('family_member_invited', { walletId: wallet.id });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Invite a member</Text>
      <FormTextInput control={control} name="name" label="Name" placeholder="Ayo" />
      <FormTextInput control={control} name="contact" label="Phone or email" placeholder="ayo@example.com" />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={handleSubmit(onSubmit)}
        accessibilityRole="button"
        accessibilityLabel="Send invite"
      >
        <Text style={styles.buttonText}>Send invite</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  button: { marginTop: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
