import { BudgetCategory } from '@/store/types';

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'bc_food',
    name: 'Food',
    monthlyLimit: 120000,
    spentThisMonth: 68000,
    alert80: true,
    alert90: true
  },
  {
    id: 'bc_transport',
    name: 'Transport',
    monthlyLimit: 60000,
    spentThisMonth: 32000,
    alert80: true,
    alert90: false
  },
  {
    id: 'bc_subs',
    name: 'Subscriptions',
    monthlyLimit: 20000,
    spentThisMonth: 16900,
    alert80: true,
    alert90: true
  },
  {
    id: 'bc_util',
    name: 'Utilities',
    monthlyLimit: 50000,
    spentThisMonth: 15000,
    alert80: true,
    alert90: true
  },
  {
    id: 'bc_savings',
    name: 'Savings',
    monthlyLimit: 100000,
    spentThisMonth: 80000,
    alert80: false,
    alert90: false
  }
];
