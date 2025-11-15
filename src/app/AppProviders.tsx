import React, { useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from '@/utils/theme';
import { initI18n } from '@/i18n';
import { RootNavigator } from '@/navigation/RootNavigator';
import { useColorScheme } from 'react-native';
import { seedMocksIfEmpty } from '@/services/mocks/seed';

const AppNavigationContainer: React.FC = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export const AppProviders: React.FC = () => {
  useEffect(() => {
    initI18n();
    seedMocksIfEmpty().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigationContainer />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};
