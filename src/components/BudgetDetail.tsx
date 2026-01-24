import { Budget, Expense, formatCurrency, getTotalSpentByBudget, getBudgetProgress } from '@/lib/budget';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ArrowLeft, Trash2 } from 'lucide-react';

interface BudgetDetailProps {
  budget: Budget;
  expenses: Expense[];
  onBack: () => void;
  onDeleteBudget: (budgetId: string) => void;
  onCreateExpense: (budgetId: string, name: string, amount: number) => void;
  onDeleteExpense: (expenseId: string) => void;
}

export const BudgetDetail = ({
  budget,
  expenses,
  onBack,
  onDeleteBudget,
  onCreateExpense,
  onDeleteExpense,
}: BudgetDetailProps) => {
  const budgetExpenses = expenses.filter(e => e.budgetId === budget.id);
  const spent = getTotalSpentByBudget(budget.id);
  const remaining = budget.amount - spent;
  const progress = getBudgetProgress(budget);
  const isOverBudget = remaining < 0;

  const handleDelete = () => {
    onDeleteBudget(budget.id);
    onBack();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Budgets
        </Button>
        <Button
          variant="ghost"
          className="text-destructive hover:bg-destructive/10"
          onClick={handleDelete}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Budget
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="bg-card p-8 rounded-2xl shadow-card">
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: budget.color }}
          />
          <h1 className="text-3xl font-bold text-foreground">{budget.name}</h1>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 mb-6">
          <div className="text-center p-4 bg-secondary rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Budgeted</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(budget.amount)}</p>
          </div>
          <div className="text-center p-4 bg-secondary rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Spent</p>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(spent)}</p>
          </div>
          <div className={`text-center p-4 rounded-xl ${isOverBudget ? 'bg-destructive/10' : 'bg-secondary'}`}>
            <p className="text-sm text-muted-foreground mb-1">
              {isOverBudget ? 'Over Budget' : 'Remaining'}
            </p>
            <p className={`text-2xl font-bold ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
              {formatCurrency(Math.abs(remaining))}
            </p>
          </div>
        </div>

        <Progress 
          value={progress} 
          className="h-4"
          style={{
            '--progress-background': isOverBudget ? 'hsl(var(--destructive))' : budget.color,
          } as React.CSSProperties}
        />
        <p className="text-sm text-muted-foreground mt-2 text-right">
          {progress.toFixed(0)}% used
        </p>
      </div>

      {/* Add Expense Form */}
      <ExpenseForm
        budgets={[budget]}
        onCreateExpense={onCreateExpense}
        selectedBudgetId={budget.id}
      />

      {/* Expense List */}
      <ExpenseList
        expenses={budgetExpenses}
        budgets={[budget]}
        onDeleteExpense={onDeleteExpense}
        showBudgetColumn={false}
      />
    </div>
  );
};
