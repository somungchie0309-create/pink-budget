// Budget App Types and Utilities

export interface Budget {
  id: string;
  name: string;
  amount: number;
  color: string;
  createdAt: number;
}

export interface Expense {
  id: string;
  budgetId: string;
  name: string;
  amount: number;
  createdAt: number;
}

export interface UserData {
  userName: string;
  createdAt: number;
}

// Storage keys
const BUDGETS_KEY = 'budgets';
const EXPENSES_KEY = 'expenses';
const USER_KEY = 'user';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// User operations
export const getUser = (): UserData | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const createUser = (userName: string): UserData => {
  const user: UserData = {
    userName,
    createdAt: Date.now(),
  };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
};

export const deleteUser = (): void => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(BUDGETS_KEY);
  localStorage.removeItem(EXPENSES_KEY);
};

// Budget operations
export const getBudgets = (): Budget[] => {
  const data = localStorage.getItem(BUDGETS_KEY);
  return data ? JSON.parse(data) : [];
};

export const createBudget = (name: string, amount: number): Budget => {
  const budgets = getBudgets();
  const colors = [
    'hsl(346, 77%, 56%)',   // Primary pink
    'hsl(24, 95%, 66%)',    // Accent coral
    'hsl(152, 69%, 45%)',   // Success green
    'hsl(280, 65%, 60%)',   // Purple
    'hsl(200, 80%, 50%)',   // Blue
    'hsl(38, 92%, 50%)',    // Warning amber
    'hsl(320, 70%, 55%)',   // Magenta
    'hsl(170, 60%, 45%)',   // Teal
  ];
  
  const budget: Budget = {
    id: generateId(),
    name,
    amount,
    color: colors[budgets.length % colors.length],
    createdAt: Date.now(),
  };
  
  localStorage.setItem(BUDGETS_KEY, JSON.stringify([...budgets, budget]));
  return budget;
};

export const deleteBudget = (budgetId: string): void => {
  const budgets = getBudgets().filter(b => b.id !== budgetId);
  localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  
  // Also delete associated expenses
  const expenses = getExpenses().filter(e => e.budgetId !== budgetId);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

// Expense operations
export const getExpenses = (): Expense[] => {
  const data = localStorage.getItem(EXPENSES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getExpensesByBudgetId = (budgetId: string): Expense[] => {
  return getExpenses().filter(e => e.budgetId === budgetId);
};

export const createExpense = (budgetId: string, name: string, amount: number): Expense => {
  const expenses = getExpenses();
  const expense: Expense = {
    id: generateId(),
    budgetId,
    name,
    amount,
    createdAt: Date.now(),
  };
  
  localStorage.setItem(EXPENSES_KEY, JSON.stringify([...expenses, expense]));
  return expense;
};

export const deleteExpense = (expenseId: string): void => {
  const expenses = getExpenses().filter(e => e.id !== expenseId);
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
};

// Calculations
export const getTotalSpentByBudget = (budgetId: string): number => {
  return getExpensesByBudgetId(budgetId).reduce((total, expense) => total + expense.amount, 0);
};

export const getRemainingBudget = (budget: Budget): number => {
  return budget.amount - getTotalSpentByBudget(budget.id);
};

export const getBudgetProgress = (budget: Budget): number => {
  const spent = getTotalSpentByBudget(budget.id);
  return Math.min((spent / budget.amount) * 100, 100);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (timestamp: number): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(timestamp));
};
