import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createPersistStorage } from './storage';
import { User } from './types';

interface AuthState {
  user: User | null;
  maskedBalance: boolean;
  pinSet: boolean;
  biometricEnabled: boolean;
  sessionLocked: boolean;
  lastActiveAt: number;
  setUser: (user: User | null) => void;
  toggleMaskedBalance: () => void;
  setPinSet: (value: boolean) => void;
  setBiometricEnabled: (value: boolean) => void;
  lockSession: () => void;
  unlockSession: () => void;
  updateLastActive: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      maskedBalance: true,
      pinSet: false,
      biometricEnabled: false,
      sessionLocked: false,
      lastActiveAt: Date.now(),
      setUser: (user) => set({ user }),
      toggleMaskedBalance: () =>
        set((state) => ({ maskedBalance: !state.maskedBalance })),
      setPinSet: (value) => set({ pinSet: value }),
      setBiometricEnabled: (value) => set({ biometricEnabled: value }),
      lockSession: () => set({ sessionLocked: true }),
      unlockSession: () => set({ sessionLocked: false, lastActiveAt: Date.now() }),
      updateLastActive: () => set({ lastActiveAt: Date.now() })
    }),
    {
      name: 'autopay-auth',
      storage: createPersistStorage('autopay-auth'),
      partialize: (state) => ({
        user: state.user,
        maskedBalance: state.maskedBalance,
        pinSet: state.pinSet,
        biometricEnabled: state.biometricEnabled,
        lastActiveAt: state.lastActiveAt
      })
    }
  )
);
