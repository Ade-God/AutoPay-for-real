import { LinkedBank } from '@/store/types';

export interface LinkedBankResponse {
  id: string;
  name: string;
  provider: string;
  last4?: string;
  last_synced_at: string;
  connected_at: string;
}

export const mapLinkedBankResponse = (payload: LinkedBankResponse): LinkedBank => ({
  id: payload.id,
  name: payload.name,
  provider: (payload.provider as LinkedBank['provider']) ?? 'mock',
  last4: payload.last4,
  lastSyncedAt: payload.last_synced_at,
  connectedAt: payload.connected_at
});
