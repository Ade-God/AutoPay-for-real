import { BillProvider } from '@/store/types';

export const PROVIDERS: BillProvider[] = [
  {
    id: 'phcn_ikeja',
    name: 'PHCN (Ikeja Electric)',
    category: 'Utilities',
    accountLabel: 'Meter No.',
    supportsValidation: true
  },
  {
    id: 'phcn_eko',
    name: 'PHCN (Eko Electric)',
    category: 'Utilities',
    accountLabel: 'Meter No.',
    supportsValidation: true
  },
  {
    id: 'dstv',
    name: 'DStv',
    category: 'Subscriptions',
    accountLabel: 'Smartcard No.',
    supportsValidation: true
  },
  {
    id: 'gotv',
    name: 'GOtv',
    category: 'Subscriptions',
    accountLabel: 'IUC No.',
    supportsValidation: true
  },
  {
    id: 'mtn_data',
    name: 'MTN Data',
    category: 'Data',
    accountLabel: 'Phone',
    supportsValidation: false
  },
  {
    id: 'airtel_data',
    name: 'Airtel Data',
    category: 'Data',
    accountLabel: 'Phone',
    supportsValidation: false
  },
  {
    id: 'smile',
    name: 'Smile Internet',
    category: 'Data',
    accountLabel: 'Account ID',
    supportsValidation: true
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Subscriptions',
    accountLabel: 'Email',
    supportsValidation: false
  },
  {
    id: 'rent',
    name: 'Rent (Landlord)',
    category: 'Housing',
    accountLabel: 'Reference',
    supportsValidation: false
  },
  {
    id: 'gym',
    name: 'Gym Membership',
    category: 'Subscriptions',
    accountLabel: 'Member ID',
    supportsValidation: false
  },
  {
    id: 'transport',
    name: 'Transport Wallet',
    category: 'Transport',
    accountLabel: 'Plate/ID',
    supportsValidation: false
  }
];
