import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useTheme } from '@/utils/theme';
import { ProgressBar } from '@/components/ProgressBar';
import { Toggle } from '@/components/Toggle';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export const BudgetScreen: React.FC = () => {
  const theme = useTheme();
  const { categories, updateCategory } = useBudgetStore();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleToggle = (categoryId: string, key: 'alert80' | 'alert90', value: boolean) => {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;
    updateCategory({ ...category, [key]: value });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.heading, { color: theme.text }]}>Monthly Overview</Text>
      {categories.map((category) => {
        const progress = Math.min(category.spentThisMonth / category.monthlyLimit, 1);
        return (
          <TouchableOpacity
            key={category.id}
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => navigation.navigate('BudgetFlow')}
            accessibilityRole="button"
            accessibilityLabel={`View ${category.name} budget`}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>{category.name}</Text>
              <Text style={{ color: theme.muted }}>₦{category.spentThisMonth.toLocaleString()} / ₦{category.monthlyLimit.toLocaleString()}</Text>
            </View>
            <ProgressBar progress={progress} color={progress > 0.9 ? theme.danger : progress > 0.8 ? theme.warning : theme.primary} />
            <View style={styles.toggles}>
              <Toggle
                label="80% alert"
                value={category.alert80}
                onValueChange={(value) => handleToggle(category.id, 'alert80', value)}
              />
              <Toggle
                label="90% alert"
                value={category.alert90}
                onValueChange={(value) => handleToggle(category.id, 'alert90', value)}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 120 },
  heading: { fontSize: 20, fontWeight: '700', marginBottom: 16 },
  card: { borderRadius: 16, padding: 16, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  toggles: { marginTop: 8 }
});
