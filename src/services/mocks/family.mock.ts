import { FamilyWallet } from '@/store/types';

export const FAMILY_WALLETS: FamilyWallet[] = [
  {
    id: 'fw_house',
    name: 'House Bills',
    color: '#3B82F6',
    balance: 250000,
    members: [
      { id: 'm_peter', name: 'Peter Oshinowo', phoneOrEmail: 'peter@hooom.co', role: 'Admin' },
      { id: 'm_ayo', name: 'Ayo', phoneOrEmail: 'ayo@example.com', role: 'Contributor' }
    ],
    sharedBillIds: ['bill_power', 'bill_dstv', 'bill_net']
  },
  {
    id: 'fw_kids',
    name: 'Kids Allowance',
    color: '#22C55E',
    balance: 50000,
    members: [
      { id: 'm_peter', name: 'Peter Oshinowo', phoneOrEmail: 'peter@hooom.co', role: 'Admin' },
      { id: 'm_jide', name: 'Jide', phoneOrEmail: 'jide@example.com', role: 'Viewer' }
    ],
    sharedBillIds: [],
    allowanceRule: {
      monthlyLimit: 40000,
      autoTopUpDay: 1
    }
  }
];
