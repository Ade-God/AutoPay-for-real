import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QuickPayScreen } from '@/screens/PaymentFlow/QuickPayScreen';
import { ThemeProvider } from '@/utils/theme';
import { usePaymentsStore } from '@/store/usePaymentsStore';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('QuickPayScreen', () => {
  beforeEach(() => {
    usePaymentsStore.setState({ methods: [{ id: 'pm_wallet_default', type: 'Wallet', label: 'Default Wallet', isDefault: true }], quickPayDraft: {}, transactions: [], notifications: [], payments: [], lastReceipt: null });
  });

  it('shows validation errors when required fields missing', async () => {
    const { getByText } = render(
      <Providers>
        <QuickPayScreen />
      </Providers>
    );

    const review = getByText('Review');
    fireEvent.press(review);

    await waitFor(() => {
      expect(getByText('Provider is required')).toBeTruthy();
    });
  });
});
