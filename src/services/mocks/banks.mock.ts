import { LinkedBank } from '@/store/types';
import { isoNow, addDays } from '@/utils/dates';

const now = isoNow();

export const LINKED_BANKS: LinkedBank[] = [
  {
    id: 'uba',
    name: 'UBA',
    provider: 'mock',
    last4: '9021',
    connectedAt: addDays(now, -14),
    lastSyncedAt: addDays(now, -1)
  },
  {
    id: 'gtb',
    name: 'GTBank',
    provider: 'mock',
    last4: '1183',
    connectedAt: addDays(now, -21),
    lastSyncedAt: addDays(now, -2)
  },
  {
    id: 'access',
    name: 'Access',
    provider: 'mock',
    last4: '4407',
    connectedAt: addDays(now, -30),
    lastSyncedAt: addDays(now, -1)
  }
];
