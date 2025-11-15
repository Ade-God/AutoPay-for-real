export type OnboardingStackParamList = {
  Welcome: undefined;
  Signup: undefined;
  VerifyOTP: undefined;
  CreatePIN: undefined;
  EnableBiometric: undefined;
  ConnectBankIntro: undefined;
};

export type AddBillStackParamList = {
  AddBillType: undefined;
  AddBillProvider: { type: string };
  AddBillDetails: { providerId: string };
  AddBillSchedule: { providerId: string; accountRef: string; amount: number };
  AddBillConfirm: { providerId: string; accountRef: string; amount: number; schedule: string };
};

export type PaymentFlowParamList = {
  QuickPay: undefined;
  PaymentMethod: undefined;
  PaymentConfirm: { provider: string; amount: number; methodId: string; memo?: string };
  PaymentReceipt: { transactionId: string };
};

export type BudgetFlowParamList = {
  CreateBudget: undefined;
  CategoryDetail: { categoryId: string };
};

export type FamilyFlowParamList = {
  FamilyDashboard: undefined;
  CreateFamilyWallet: undefined;
  InviteMember: { walletId: string };
  MemberPermissions: { memberId: string; walletId: string };
};

export type TransactionsParamList = {
  TransactionsList: undefined;
  TransactionDetail: { id: string };
};

export type SettingsParamList = {
  Security: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  ConnectedBanks: undefined;
  HelpCenter: undefined;
  Legal: undefined;
};

export type TabParamList = {
  Home: undefined;
  Payments: undefined;
  Bills: undefined;
  Budget: undefined;
  Family: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  RootTabs: undefined;
  Profile: undefined;
  BillDetail: { billId: string };
  AddBillFlow: undefined;
  QuickPayFlow: undefined;
  BudgetFlow: undefined;
  FamilyFlow: undefined;
  Transactions: undefined;
  Security: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  ConnectedBanks: undefined;
  HelpCenter: undefined;
  Legal: undefined;
};
