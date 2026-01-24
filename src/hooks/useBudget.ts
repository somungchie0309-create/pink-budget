import { useState, useEffect, useCallback } from 'react';
import {
  Budget,
  Expense,
  UserData,
  getUser,
  createUser,
  deleteUser,
  getBudgets,
  createBudget,
  deleteBudget,
  getExpenses,
  createExpense,
  deleteExpense,
} from '@/lib/budget';

export const useBudget = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  const loadData = useCallback(() => {
    setUser(getUser());
    setBudgets(getBudgets());
    setExpenses(getExpenses());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // User actions
  const handleCreateUser = useCallback((userName: string) => {
    const newUser = createUser(userName);
    setUser(newUser);
  }, []);

  const handleDeleteUser = useCallback(() => {
    deleteUser();
    setUser(null);
    setBudgets([]);
    setExpenses([]);
  }, []);

  // Budget actions
  const handleCreateBudget = useCallback((name: string, amount: number) => {
    const newBudget = createBudget(name, amount);
    setBudgets(prev => [...prev, newBudget]);
  }, []);

  const handleDeleteBudget = useCallback((budgetId: string) => {
    deleteBudget(budgetId);
    setBudgets(prev => prev.filter(b => b.id !== budgetId));
    setExpenses(prev => prev.filter(e => e.budgetId !== budgetId));
  }, []);

  // Expense actions
  const handleCreateExpense = useCallback((budgetId: string, name: string, amount: number) => {
    const newExpense = createExpense(budgetId, name, amount);
    setExpenses(prev => [...prev, newExpense]);
  }, []);

  const handleDeleteExpense = useCallback((expenseId: string) => {
    deleteExpense(expenseId);
    setExpenses(prev => prev.filter(e => e.id !== expenseId));
  }, []);

  return {
    user,
    budgets,
    expenses,
    isLoading,
    createUser: handleCreateUser,
    deleteUser: handleDeleteUser,
    createBudget: handleCreateBudget,
    deleteBudget: handleDeleteBudget,
    createExpense: handleCreateExpense,
    deleteExpense: handleDeleteExpense,
  };
};
