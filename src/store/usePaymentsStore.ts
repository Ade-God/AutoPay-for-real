import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Payment, PaymentMethod, Transaction, AppNotification } from './types';
import { createPersistStorage } from './storage';
import { QuickPayFormValues } from '@/utils/validation';

interface PaymentsState {
  methods: PaymentMethod[];
  quickPayDraft: Partial<QuickPayFormValues>;
  lastReceipt: Transaction | null;
  payments: Payment[];
  transactions: Transaction[];
  notifications: AppNotification[];
  setMethods: (methods: PaymentMethod[]) => void;
  setQuickPayDraft: (draft: Partial<QuickPayFormValues>) => void;
  setLastReceipt: (receipt: Transaction | null) => void;
  addPayment: (payment: Payment) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setNotifications: (notifications: AppNotification[]) => void;
}

export const usePaymentsStore = create<PaymentsState>()(
  persist(
    (set) => ({
      methods: [],
      quickPayDraft: {},
      lastReceipt: null,
      payments: [],
      transactions: [],
      notifications: [],
      setMethods: (methods) => set({ methods }),
      setQuickPayDraft: (draft) => set({ quickPayDraft: draft }),
      setLastReceipt: (receipt) => set({ lastReceipt: receipt }),
      addPayment: (payment) =>
        set((state) => ({ payments: [payment, ...state.payments] })),
      setTransactions: (transactions) => set({ transactions }),
      setNotifications: (notifications) => set({ notifications })
    }),
    {
      name: 'autopay-payments',
      storage: createPersistStorage('autopay-payments'),
      partialize: (state) => ({
        methods: state.methods,
        quickPayDraft: state.quickPayDraft,
        lastReceipt: state.lastReceipt,
        transactions: state.transactions,
        notifications: state.notifications
      })
    }
  )
);
