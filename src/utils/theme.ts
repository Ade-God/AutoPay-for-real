import { Appearance } from 'react-native';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const lightPalette = {
  background: '#F5F7FB',
  card: '#FFFFFF',
  primary: '#1B4AEF',
  text: '#0A0F2C',
  muted: '#6B7280',
  border: '#E5E7EB',
  danger: '#DC2626',
  success: '#059669',
  warning: '#D97706'
};

const darkPalette = {
  background: '#050816',
  card: '#101425',
  primary: '#3B82F6',
  text: '#F9FAFB',
  muted: '#9CA3AF',
  border: '#1F2937',
  danger: '#F87171',
  success: '#34D399',
  warning: '#FBBF24'
};

export type Theme = typeof lightPalette & {
  mode: 'light' | 'dark';
  spacing: (value: number) => number;
  radius: { sm: number; md: number; lg: number };
};

const buildTheme = (mode: 'light' | 'dark'): Theme => ({
  ...(mode === 'light' ? lightPalette : darkPalette),
  mode,
  spacing: (value: number) => value * 8,
  radius: { sm: 8, md: 12, lg: 20 }
});

const ThemeContext = createContext<Theme>(buildTheme('light'));

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(Appearance.getColorScheme() ?? 'light');

  useEffect(() => {
    const listener = ({ colorScheme }: { colorScheme: 'light' | 'dark' | null }) => {
      if (colorScheme) {
        setMode(colorScheme);
      }
    };
    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, []);

  const theme = useMemo(() => buildTheme(mode), [mode]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
