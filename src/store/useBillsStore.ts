import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bill, BillProvider } from './types';
import { createPersistStorage } from './storage';

interface BillsState {
  bills: Bill[];
  providers: BillProvider[];
  loading: boolean;
  setBills: (bills: Bill[]) => void;
  addBill: (bill: Bill) => void;
  updateBill: (bill: Bill) => void;
  toggleBill: (id: string) => void;
  setProviders: (providers: BillProvider[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useBillsStore = create<BillsState>()(
  persist(
    (set) => ({
      bills: [],
      providers: [],
      loading: false,
      setBills: (bills) => set({ bills }),
      addBill: (bill) => set((state) => ({ bills: [...state.bills, bill] })),
      updateBill: (bill) =>
        set((state) => ({
          bills: state.bills.map((existing) =>
            existing.id === bill.id ? { ...existing, ...bill } : existing
          )
        })),
      toggleBill: (id) =>
        set((state) => ({
          bills: state.bills.map((bill) =>
            bill.id === id ? { ...bill, active: !bill.active } : bill
          )
        })),
      setProviders: (providers) => set({ providers }),
      setLoading: (loading) => set({ loading })
    }),
    {
      name: 'autopay-bills',
      storage: createPersistStorage('autopay-bills'),
      partialize: (state) => ({ bills: state.bills, providers: state.providers })
    }
  )
);
