import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FamilyWallet } from './types';
import { createPersistStorage } from './storage';

interface FamilyState {
  wallets: FamilyWallet[];
  setWallets: (wallets: FamilyWallet[]) => void;
  addWallet: (wallet: FamilyWallet) => void;
  updateWallet: (wallet: FamilyWallet) => void;
}

export const useFamilyStore = create<FamilyState>()(
  persist(
    (set) => ({
      wallets: [],
      setWallets: (wallets) => set({ wallets }),
      addWallet: (wallet) => set((state) => ({ wallets: [...state.wallets, wallet] })),
      updateWallet: (wallet) =>
        set((state) => ({
          wallets: state.wallets.map((current) =>
            current.id === wallet.id ? wallet : current
          )
        }))
    }),
    {
      name: 'autopay-family',
      storage: createPersistStorage('autopay-family')
    }
  )
);
