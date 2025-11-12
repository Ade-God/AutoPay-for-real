import { Bill } from '@/store/types';
import { startOfNextMonth, addDays, isoNow } from '@/utils/dates';

const now = isoNow();

export const BILLS: Bill[] = [
  {
    id: 'bill_power',
    providerId: 'phcn_ikeja',
    nickname: 'Home Power',
    accountRef: '0123456789',
    amount: 15000,
    currency: 'NGN',
    frequency: 'Monthly',
    nextRunAt: startOfNextMonth(),
    methodId: 'pm_wallet_default',
    active: true
  },
  {
    id: 'bill_dstv',
    providerId: 'dstv',
    nickname: 'DSTV Compact',
    accountRef: '01234567890',
    amount: 12000,
    currency: 'NGN',
    frequency: 'Monthly',
    nextRunAt: addDays(now, 10),
    methodId: 'pm_card_1234',
    active: true
  },
  {
    id: 'bill_mtn',
    providerId: 'mtn_data',
    nickname: 'MTN Data',
    accountRef: '08031234567',
    amount: 5000,
    currency: 'NGN',
    frequency: 'Monthly',
    nextRunAt: addDays(now, 25),
    methodId: 'pm_wallet_default',
    active: true
  },
  {
    id: 'bill_rent',
    providerId: 'rent',
    nickname: 'House Rent',
    accountRef: 'INV-2025-RENT',
    amount: 600000,
    currency: 'NGN',
    frequency: 'Monthly',
    nextRunAt: startOfNextMonth(),
    methodId: 'pm_bank_uba_9021',
    active: true
  },
  {
    id: 'bill_net',
    providerId: 'netflix',
    nickname: 'Netflix',
    accountRef: 'peter@hooom.co',
    amount: 4900,
    currency: 'NGN',
    frequency: 'Monthly',
    nextRunAt: addDays(now, 5),
    methodId: 'pm_card_1234',
    active: true
  }
];
