import { Transaction } from '@/store/types';
import { isoNow, addDays } from '@/utils/dates';

const base = isoNow();

export const TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_001',
    createdAt: addDays(base, -1),
    billId: 'bill_power',
    providerId: 'phcn_ikeja',
    description: 'PHCN Ikeja Prepaid',
    amount: 15000,
    currency: 'NGN',
    methodId: 'pm_wallet_default',
    status: 'Success',
    reference: 'AP-IE-239401',
    fees: 0
  },
  {
    id: 'tx_002',
    createdAt: addDays(base, -3),
    billId: 'bill_dstv',
    providerId: 'dstv',
    description: 'DSTV Compact Renewal',
    amount: 12000,
    currency: 'NGN',
    methodId: 'pm_card_1234',
    status: 'Success',
    reference: 'AP-DSTV-439911',
    fees: 0
  },
  {
    id: 'tx_003',
    createdAt: addDays(base, -6),
    billId: 'bill_mtn',
    providerId: 'mtn_data',
    description: 'MTN 10GB Data',
    amount: 5000,
    currency: 'NGN',
    methodId: 'pm_wallet_default',
    status: 'Failed',
    reference: 'AP-MTN-009991',
    fees: 0
  },
  {
    id: 'tx_004',
    createdAt: addDays(base, -8),
    billId: 'bill_net',
    providerId: 'netflix',
    description: 'Netflix Basic',
    amount: 4900,
    currency: 'NGN',
    methodId: 'pm_card_1234',
    status: 'Success',
    reference: 'AP-NFX-200111',
    fees: 0
  },
  {
    id: 'tx_005',
    createdAt: addDays(base, -12),
    providerId: 'phcn_eko',
    description: 'Quick Pay – Eko Electric',
    amount: 10000,
    currency: 'NGN',
    methodId: 'pm_wallet_default',
    status: 'Pending',
    reference: 'AP-EKO-555128',
    fees: 0
  }
];
