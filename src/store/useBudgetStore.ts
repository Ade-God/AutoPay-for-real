import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BudgetCategory } from './types';
import { createPersistStorage } from './storage';

interface BudgetState {
  categories: BudgetCategory[];
  setCategories: (categories: BudgetCategory[]) => void;
  updateCategory: (category: BudgetCategory) => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      updateCategory: (category) =>
        set((state) => ({
          categories: state.categories.map((current) =>
            current.id === category.id ? category : current
          )
        }))
    }),
    {
      name: 'autopay-budget',
      storage: createPersistStorage('autopay-budget')
    }
  )
);
