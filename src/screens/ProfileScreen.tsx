import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { useTheme } from '@/utils/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export const ProfileScreen: React.FC = () => {
  const { user } = useAuthStore();
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const menu = [
    { label: 'Security', route: 'Security' as const },
    { label: 'Payment methods', route: 'PaymentMethods' as const },
    { label: 'Notifications', route: 'Notifications' as const },
    { label: 'Connected banks', route: 'ConnectedBanks' as const },
    { label: 'Help center', route: 'HelpCenter' as const },
    { label: 'Legal', route: 'Legal' as const }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.card }]}> 
        <Text style={[styles.name, { color: theme.text }]}>{user?.name}</Text>
        <Text style={{ color: theme.muted }}>{user?.email}</Text>
        <View style={styles.badge}>
          <Text style={{ color: '#fff' }}>{user?.kycStatus === 'verified' ? 'KYC Verified' : 'KYC Pending'}</Text>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: theme.card }]}> 
        {menu.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.row}
            onPress={() => navigation.navigate(item.route)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
          >
            <Text style={{ color: theme.text }}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  card: { borderRadius: 16, padding: 16, marginBottom: 20 },
  name: { fontSize: 20, fontWeight: '700' },
  badge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    backgroundColor: '#059669'
  },
  row: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb'
  }
});
