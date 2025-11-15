import { AppNotification } from '@/store/types';
import { isoNow, addDays } from '@/utils/dates';

const base = isoNow();

export const NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    createdAt: addDays(base, -1),
    kind: 'Payment',
    title: 'Payment successful',
    message: 'Paid ₦15,000 to PHCN Ikeja.',
    read: false,
    link: { route: 'TransactionDetail', params: { id: 'tx_001' } }
  },
  {
    id: 'n2',
    createdAt: addDays(base, -2),
    kind: 'Budget',
    title: 'Budget alert',
    message: 'Subscriptions budget used 85%.',
    read: false,
    link: { route: 'BudgetScreen' }
  },
  {
    id: 'n3',
    createdAt: addDays(base, -3),
    kind: 'System',
    title: 'Bank sync',
    message: 'UBA synced 2 new transactions.',
    read: true,
    link: { route: 'ConnectedBanksScreen' }
  },
  {
    id: 'n4',
    createdAt: addDays(base, -4),
    kind: 'Family',
    title: 'Family update',
    message: 'Ayo paid ₦12,000 for DSTV from House Bills.',
    read: true,
    link: { route: 'FamilyDashboardScreen' }
  }
];
