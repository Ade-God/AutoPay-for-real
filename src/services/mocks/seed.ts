import { mocks } from './index';
import { useBillsStore } from '@/store/useBillsStore';
import { usePaymentsStore } from '@/store/usePaymentsStore';
import { useBudgetStore } from '@/store/useBudgetStore';
import { useFamilyStore } from '@/store/useFamilyStore';
import { useBanksStore } from '@/store/useBanksStore';

let seeded = false;

export const seedMocksIfEmpty = async () => {
  if (seeded) return;
  const billsStore = useBillsStore.getState();
  const paymentsStore = usePaymentsStore.getState();
  const budgetStore = useBudgetStore.getState();
  const familyStore = useFamilyStore.getState();
  const banksStore = useBanksStore.getState();

  if (!banksStore.linkedBanks.length) {
    banksStore.setLinkedBanks(await mocks.getLinkedBanks());
  }

  if (!paymentsStore.methods.length) {
    paymentsStore.setMethods(await mocks.getPaymentMethods());
  }

  if (!billsStore.bills.length) {
    billsStore.setBills(await mocks.getBills());
  }

  if (!budgetStore.categories.length) {
    budgetStore.setCategories(await mocks.getBudgetCategories());
  }

  if (!familyStore.wallets.length) {
    familyStore.setWallets(await mocks.getFamilyWallets());
  }

  if (!paymentsStore.transactions.length) {
    paymentsStore.setTransactions(await mocks.getTransactions());
  }

  if (!paymentsStore.notifications.length) {
    paymentsStore.setNotifications(await mocks.getNotifications());
  }

  seeded = true;
};
