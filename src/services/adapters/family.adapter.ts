import { FamilyWallet } from '@/store/types';

export interface FamilyWalletResponse {
  id: string;
  name: string;
  color: string;
  balance: number;
  members: { id: string; name: string; phone_or_email: string; role: string }[];
  shared_bill_ids: string[];
  allowance_rule?: {
    monthly_limit: number;
    auto_top_up_day: number;
  };
}

export const mapFamilyWalletResponse = (
  payload: FamilyWalletResponse
): FamilyWallet => ({
  id: payload.id,
  name: payload.name,
  color: payload.color,
  balance: payload.balance,
  members: payload.members.map((member) => ({
    id: member.id,
    name: member.name,
    phoneOrEmail: member.phone_or_email,
    role: member.role as FamilyWallet['members'][number]['role']
  })),
  sharedBillIds: payload.shared_bill_ids,
  allowanceRule: payload.allowance_rule
    ? {
        monthlyLimit: payload.allowance_rule.monthly_limit,
        autoTopUpDay: payload.allowance_rule.auto_top_up_day
      }
    : undefined
});
