import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LinkedBank } from './types';
import { createPersistStorage } from './storage';

interface BanksState {
  linkedBanks: LinkedBank[];
  syncingBankIds: string[];
  setLinkedBanks: (banks: LinkedBank[]) => void;
  addLinkedBank: (bank: LinkedBank) => void;
  removeLinkedBank: (bankId: string) => void;
  setSyncing: (bankId: string, syncing: boolean) => void;
}

export const useBanksStore = create<BanksState>()(
  persist(
    (set) => ({
      linkedBanks: [],
      syncingBankIds: [],
      setLinkedBanks: (banks) => set({ linkedBanks: banks }),
      addLinkedBank: (bank) =>
        set((state) => ({ linkedBanks: [...state.linkedBanks, bank] })),
      removeLinkedBank: (bankId) =>
        set((state) => ({
          linkedBanks: state.linkedBanks.filter((bank) => bank.id !== bankId)
        })),
      setSyncing: (bankId, syncing) =>
        set((state) => ({
          syncingBankIds: syncing
            ? [...state.syncingBankIds, bankId]
            : state.syncingBankIds.filter((id) => id !== bankId)
        }))
    }),
    {
      name: 'autopay-banks',
      storage: createPersistStorage('autopay-banks')
    }
  )
);
