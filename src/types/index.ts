export type Sex = 'male' | 'female';
export type Goal = 'lose' | 'maintain' | 'gain';
export type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very';

export interface MacroSplit {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface MealSplitItem {
  name: string;
  pct: number;
  calories: number;
  suggestedFoods?: string[];
}

export interface CalculationResult {
  bmr: number;
  tdee: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  mealsCount: number;
  waterDailyMl: number;
  mealPlan: MealSplitItem[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat';
  portionGrams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  measureDescription: string;
}

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: 'admin' | 'user';
  plan: 'free' | 'premium' | 'vip';
  status?: 'active' | 'suspended';
  registeredAt: string;
  totalPaid?: number;
}

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  planId: 'premium' | 'vip';
  planName: string;
  amount: number;
  method: 'pix' | 'credit_card';
  status: 'approved' | 'pending' | 'refunded';
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  validUntil: string;
  usageCount: number;
  maxUses: number;
  active: boolean;
}

export interface PlanPricingConfig {
  id: 'free' | 'premium' | 'vip';
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  badge: string;
}
