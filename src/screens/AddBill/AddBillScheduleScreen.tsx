import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AddBillStackParamList } from '@/navigation/types';
import { Radio } from '@/components/Radio';
import { useTheme } from '@/utils/theme';

type Nav = NativeStackNavigationProp<AddBillStackParamList>;

type Route = RouteProp<AddBillStackParamList, 'AddBillSchedule'>;

export const AddBillScheduleScreen: React.FC = () => {
  const { params } = useRoute<Route>();
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  const [frequency, setFrequency] = useState<'Monthly' | 'Weekly' | 'OneTime'>('Monthly');
  const [day, setDay] = useState('1');

  const onContinue = () => {
    navigation.navigate('AddBillConfirm', {
      providerId: params.providerId,
      accountRef: params.accountRef,
      amount: params.amount,
      schedule: `${frequency} on day ${day}`
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.content} style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Schedule</Text>
      <Radio
        options={[
          { label: 'Monthly', value: 'Monthly', description: 'Pay on a set day every month' },
          { label: 'Weekly', value: 'Weekly', description: 'Pay every week' },
          { label: 'One time', value: 'OneTime', description: 'Pay only once' }
        ]}
        value={frequency}
        onChange={(value) => setFrequency(value as 'Monthly' | 'Weekly' | 'OneTime')}
      />
      <Text style={[styles.subtitle, { color: theme.muted }]}>Day of month</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayPicker}>
        {[1, 5, 10, 15, 20, 25].map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.day, { backgroundColor: day === String(item) ? theme.primary : theme.card }]}
            onPress={() => setDay(String(item))}
            accessibilityRole="button"
            accessibilityLabel={`Select day ${item}`}
          >
            <Text style={{ color: day === String(item) ? '#fff' : theme.text }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={onContinue}
        accessibilityRole="button"
        accessibilityLabel="Review bill"
      >
        <Text style={styles.buttonText}>Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  subtitle: { marginTop: 16, marginBottom: 8 },
  dayPicker: { flexGrow: 0 },
  day: { padding: 12, borderRadius: 12, marginRight: 12 },
  button: { marginTop: 20, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' }
});
