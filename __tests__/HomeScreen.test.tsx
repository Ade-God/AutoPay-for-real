import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeScreen } from '@/screens/HomeScreen';
import { ThemeProvider } from '@/utils/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useBillsStore } from '@/store/useBillsStore';
import { useFamilyStore } from '@/store/useFamilyStore';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('HomeScreen', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: { id: '1', name: 'Ada', email: 'ada@example.com', phone: '0803', hasCompletedOnboarding: true, kycStatus: 'verified', totalBalance: 500000 }, maskedBalance: true });
    usePaymentsStore.setState({ transactions: [], notifications: [] });
    useBudgetStore.setState({ categories: [] });
    useBillsStore.setState({ bills: [], providers: [] });
    useFamilyStore.setState({ wallets: [] });
  });

  it('renders greeting for user', () => {
    const { getByText } = render(
      <Providers>
        <HomeScreen />
      </Providers>
    );
    expect(getByText('Hello, Ada')).toBeTruthy();
  });
});
