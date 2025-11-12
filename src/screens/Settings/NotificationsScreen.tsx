import React from 'react';
import { ScrollView } from 'react-native';
import { Toggle } from '@/components/Toggle';
import { useTheme } from '@/utils/theme';

export const NotificationsScreen: React.FC = () => {
  const theme = useTheme();
  const [reminders, setReminders] = React.useState(true);
  const [budgetAlerts, setBudgetAlerts] = React.useState(true);
  const [system, setSystem] = React.useState(true);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }} style={{ backgroundColor: theme.background }}>
      <Toggle label="Payment reminders" value={reminders} onValueChange={setReminders} />
      <Toggle label="Budget alerts" value={budgetAlerts} onValueChange={setBudgetAlerts} />
      <Toggle label="System messages" value={system} onValueChange={setSystem} />
    </ScrollView>
  );
};
