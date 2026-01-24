import { Budget, formatCurrency, getTotalSpentByBudget, getBudgetProgress } from '@/lib/budget';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, Eye } from 'lucide-react';

interface BudgetCardProps {
  budget: Budget;
  onDelete: (budgetId: string) => void;
  onView: (budgetId: string) => void;
}

export const BudgetCard = ({ budget, onDelete, onView }: BudgetCardProps) => {
  const spent = getTotalSpentByBudget(budget.id);
  const remaining = budget.amount - spent;
  const progress = getBudgetProgress(budget);
  const isOverBudget = remaining < 0;

  return (
    <div className="bg-card p-6 rounded-2xl shadow-card hover:shadow-elevated transition-shadow animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: budget.color }}
          />
          <h3 className="font-semibold text-foreground text-lg">{budget.name}</h3>
        </div>
        <span className="text-muted-foreground font-medium">
          {formatCurrency(budget.amount)} budgeted
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress 
          value={progress} 
          className="h-3"
          style={{
            '--progress-background': isOverBudget ? 'hsl(var(--destructive))' : budget.color,
          } as React.CSSProperties}
        />
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm mb-4">
        <span className="text-muted-foreground">
          {formatCurrency(spent)} spent
        </span>
        <span className={isOverBudget ? 'text-destructive font-medium' : 'text-muted-foreground'}>
          {isOverBudget ? 'Over by ' : ''}{formatCurrency(Math.abs(remaining))} {isOverBudget ? '' : 'remaining'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="secondary"
          className="flex-1"
          onClick={() => onView(budget.id)}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(budget.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
