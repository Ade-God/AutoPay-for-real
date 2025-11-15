import { Bill, BillProvider } from '@/store/types';

export interface BillResponse {
  id: string;
  provider_id: string;
  nickname?: string;
  account_ref: string;
  amount: number;
  currency: string;
  frequency: string;
  next_run_at: string;
  method_id: string;
  active: boolean;
}

export const mapBillResponse = (payload: BillResponse): Bill => ({
  id: payload.id,
  providerId: payload.provider_id,
  nickname: payload.nickname,
  accountRef: payload.account_ref,
  amount: payload.amount,
  currency: 'NGN',
  frequency: payload.frequency as Bill['frequency'],
  nextRunAt: payload.next_run_at,
  methodId: payload.method_id,
  active: payload.active
});

export interface BillProviderResponse {
  id: string;
  name: string;
  category: string;
  account_label: string;
  supports_validation: boolean;
}

export const mapBillProviderResponse = (payload: BillProviderResponse): BillProvider => ({
  id: payload.id,
  name: payload.name,
  category: payload.category as BillProvider['category'],
  accountLabel: payload.account_label,
  supportsValidation: payload.supports_validation
});
