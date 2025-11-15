import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddBillStackParamList } from '@/navigation/types';
import { useBillsStore } from '@/store/useBillsStore';
import { useTheme } from '@/utils/theme';

type Nav = NativeStackNavigationProp<AddBillStackParamList>;

type Route = RouteProp<AddBillStackParamList, 'AddBillProvider'>;

export const AddBillProviderScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const { providers } = useBillsStore();
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  const filtered = providers.filter((provider) => provider.category === params.type);

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {filtered.map((provider) => (
        <TouchableOpacity
          key={provider.id}
          style={[styles.card, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('AddBillDetails', { providerId: provider.id })}
          accessibilityRole="button"
          accessibilityLabel={`Select ${provider.name}`}
        >
          <Text style={[styles.label, { color: theme.text }]}>{provider.name}</Text>
          <Text style={{ color: theme.muted }}>{provider.accountLabel}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  card: { padding: 16, borderRadius: 16, marginBottom: 12 },
  label: { fontSize: 16, fontWeight: '600' }
});
