import { useState } from 'react';
import { Budget, Expense, formatCurrency } from '@/lib/budget';
import { Button } from '@/components/ui/button';
import { BudgetForm } from '@/components/BudgetForm';
import { BudgetCard } from '@/components/BudgetCard';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { BudgetDetail } from '@/components/BudgetDetail';
import { LogOut, Wallet, TrendingUp, PiggyBank } from 'lucide-react';

interface DashboardProps {
  userName: string;
  budgets: Budget[];
  expenses: Expense[];
  onCreateBudget: (name: string, amount: number) => void;
  onDeleteBudget: (budgetId: string) => void;
  onCreateExpense: (budgetId: string, name: string, amount: number) => void;
  onDeleteExpense: (expenseId: string) => void;
  onDeleteUser: () => void;
}

export const Dashboard = ({
  userName,
  budgets,
  expenses,
  onCreateBudget,
  onDeleteBudget,
  onCreateExpense,
  onDeleteExpense,
  onDeleteUser,
}: DashboardProps) => {
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);

  // Calculate totals
  const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const totalRemaining = totalBudgeted - totalSpent;

  const selectedBudget = budgets.find(b => b.id === selectedBudgetId);

  if (selectedBudget) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <BudgetDetail
            budget={selectedBudget}
            expenses={expenses}
            onBack={() => setSelectedBudgetId(null)}
            onDeleteBudget={onDeleteBudget}
            onCreateExpense={onCreateExpense}
            onDeleteExpense={onDeleteExpense}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, <span className="text-primary">{userName}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your financial overview
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onDeleteUser}
            className="text-muted-foreground hover:text-destructive self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="bg-card p-6 rounded-2xl shadow-card animate-slide-up">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Budgeted</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(totalBudgeted)}</p>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-card animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-card animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Remaining</span>
            </div>
            <p className={`text-2xl font-bold ${totalRemaining < 0 ? 'text-destructive' : 'text-foreground'}`}>
              {formatCurrency(totalRemaining)}
            </p>
          </div>
        </div>

        {/* Forms */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <BudgetForm onCreateBudget={onCreateBudget} />
          <ExpenseForm budgets={budgets} onCreateExpense={onCreateExpense} />
        </div>

        {/* Budget Cards */}
        {budgets.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Budgets</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {budgets.map((budget) => (
                <BudgetCard
                  key={budget.id}
                  budget={budget}
                  onDelete={onDeleteBudget}
                  onView={setSelectedBudgetId}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Expenses */}
        {expenses.length > 0 && (
          <ExpenseList
            expenses={expenses}
            budgets={budgets}
            onDeleteExpense={onDeleteExpense}
          />
        )}

        {/* Empty State */}
        {budgets.length === 0 && (
          <div className="bg-card p-12 rounded-2xl shadow-card text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No budgets yet</h3>
            <p className="text-muted-foreground">
              Create your first budget above to start tracking your expenses!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
