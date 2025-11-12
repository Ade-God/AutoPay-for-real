import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useBillsStore } from '@/store/useBillsStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@/utils/theme';

type Nav = NativeStackNavigationProp<Record<string, object | undefined>>;

export const AddBillTypeScreen: React.FC = () => {
  const { providers } = useBillsStore();
  const navigation = useNavigation<Nav>();
  const theme = useTheme();

  const categories = Array.from(new Set(providers.map((provider) => provider.category)));

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.card, { backgroundColor: theme.card }]}
          onPress={() => navigation.navigate('AddBillProvider' as never, { type: category } as never)}
          accessibilityRole="button"
          accessibilityLabel={`Select ${category}`}
        >
          <Text style={[styles.label, { color: theme.text }]}>{category}</Text>
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
