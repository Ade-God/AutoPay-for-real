import { BudgetCategory } from '@/store/types';

export interface BudgetCategoryResponse {
  id: string;
  name: string;
  monthly_limit: number;
  spent_this_month: number;
  alert80: boolean;
  alert90: boolean;
}

export const mapBudgetCategoryResponse = (
  payload: BudgetCategoryResponse
): BudgetCategory => ({
  id: payload.id,
  name: payload.name,
  monthlyLimit: payload.monthly_limit,
  spentThisMonth: payload.spent_this_month,
  alert80: payload.alert80,
  alert90: payload.alert90
});
