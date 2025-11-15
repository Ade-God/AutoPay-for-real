import { PROVIDERS } from './providers';
import { LINKED_BANKS } from './banks.mock';
import { PAYMENT_METHODS } from './paymentMethods.mock';
import { BILLS } from './bills.mock';
import { TRANSACTIONS } from './transactions.mock';
import { BUDGET_CATEGORIES } from './budget.mock';
import { FAMILY_WALLETS } from './family.mock';
import { NOTIFICATIONS } from './notifications.mock';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const mocks = {
  getProviders: async () => {
    await delay();
    return PROVIDERS;
  },
  getLinkedBanks: async () => {
    await delay();
    return LINKED_BANKS;
  },
  getPaymentMethods: async () => {
    await delay();
    return PAYMENT_METHODS;
  },
  getBills: async () => {
    await delay();
    return BILLS;
  },
  getTransactions: async () => {
    await delay();
    return TRANSACTIONS;
  },
  getBudgetCategories: async () => {
    await delay();
    return BUDGET_CATEGORIES;
  },
  getFamilyWallets: async () => {
    await delay();
    return FAMILY_WALLETS;
  },
  getNotifications: async () => {
    await delay();
    return NOTIFICATIONS;
  }
};
