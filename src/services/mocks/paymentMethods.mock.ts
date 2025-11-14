import { PaymentMethod } from '@/store/types';

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'pm_wallet_default', type: 'Wallet', label: 'Default Wallet', isDefault: true },
  { id: 'pm_card_1234', type: 'Card', label: 'Visa ••1234' },
  { id: 'pm_bank_uba_9021', type: 'Bank', label: 'UBA ••9021', bankId: 'uba' }
];
