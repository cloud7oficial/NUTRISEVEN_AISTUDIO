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
  plan: 'free' | 'premium' | 'vip';
  registeredAt: string;
}
