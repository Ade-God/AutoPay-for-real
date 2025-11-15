export type Currency = 'NGN';

export type BillCategory =
  | 'Utilities'
  | 'Subscriptions'
  | 'Housing'
  | 'Data'
  | 'Transport'
  | 'Other';

export interface BillProvider {
  id: string;
  name: string;
  category: BillCategory;
  logo?: string;
  accountLabel: string;
  supportsValidation: boolean;
}

export type PaymentStatus = 'Success' | 'Failed' | 'Pending';
export type PaymentMethodType = 'Wallet' | 'Card' | 'Bank';

export interface LinkedBank {
  id: string;
  name: string;
  last4?: string;
  provider: 'mono' | 'okra' | 'stitch' | 'mock';
  lastSyncedAt: string;
  connectedAt: string;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string;
  bankId?: string;
  isDefault?: boolean;
}

export interface Bill {
  id: string;
  providerId: string;
  nickname?: string;
  accountRef: string;
  amount: number;
  currency: Currency;
  frequency: 'OneTime' | 'Weekly' | 'Monthly';
  nextRunAt: string;
  methodId: string;
  active: boolean;
}

export interface Transaction {
  id: string;
  createdAt: string;
  billId?: string;
  providerId?: string;
  description: string;
  amount: number;
  currency: Currency;
  methodId: string;
  status: PaymentStatus;
  reference: string;
  fees: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  monthlyLimit: number;
  spentThisMonth: number;
  alert80: boolean;
  alert90: boolean;
}

export type FamilyRole = 'Admin' | 'Contributor' | 'Viewer';

export interface FamilyMember {
  id: string;
  name: string;
  phoneOrEmail: string;
  role: FamilyRole;
}

export interface FamilyWallet {
  id: string;
  name: string;
  color: string;
  balance: number;
  members: FamilyMember[];
  sharedBillIds: string[];
  allowanceRule?: {
    monthlyLimit: number;
    autoTopUpDay: number;
  };
}

export interface AppNotification {
  id: string;
  createdAt: string;
  kind: 'Payment' | 'Budget' | 'System' | 'Family';
  title: string;
  message: string;
  read: boolean;
  link?: { route: string; params?: Record<string, string> };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  hasCompletedOnboarding: boolean;
  kycStatus: 'pending' | 'verified';
  totalBalance: number;
}

export interface Payment {
  id: string;
  providerId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  methodId: string;
}
