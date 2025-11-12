import { Transaction } from '@/store/types';

export interface TransactionResponse {
  id: string;
  description: string;
  amount: number;
  status: string;
  provider_id?: string;
  bill_id?: string;
  created_at: string;
  method_id: string;
  reference: string;
  fees: number;
}

export const mapTransactionResponse = (payload: TransactionResponse): Transaction => ({
  id: payload.id,
  description: payload.description,
  amount: payload.amount,
  status: payload.status as Transaction['status'],
  providerId: payload.provider_id,
  billId: payload.bill_id,
  createdAt: payload.created_at,
  methodId: payload.method_id,
  currency: 'NGN',
  reference: payload.reference,
  fees: payload.fees
});
