import { Expense, Budget, formatCurrency, formatDate } from '@/lib/budget';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ExpenseListProps {
  expenses: Expense[];
  budgets: Budget[];
  onDeleteExpense: (expenseId: string) => void;
  showBudgetColumn?: boolean;
}

export const ExpenseList = ({ 
  expenses, 
  budgets, 
  onDeleteExpense,
  showBudgetColumn = true 
}: ExpenseListProps) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-card p-8 rounded-2xl shadow-card text-center animate-fade-in">
        <p className="text-muted-foreground">No expenses yet. Add one above!</p>
      </div>
    );
  }

  const getBudgetForExpense = (budgetId: string) => {
    return budgets.find(b => b.id === budgetId);
  };

  // Sort by most recent first
  const sortedExpenses = [...expenses].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden animate-fade-in">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          Recent Expenses
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({expenses.length} total)
          </span>
        </h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            {showBudgetColumn && <TableHead>Budget</TableHead>}
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedExpenses.map((expense) => {
            const budget = getBudgetForExpense(expense.budgetId);
            return (
              <TableRow key={expense.id} className="group">
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(expense.amount)}</TableCell>
                {showBudgetColumn && (
                  <TableCell>
                    {budget && (
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: budget.color }}
                        />
                        <span className="text-sm">{budget.name}</span>
                      </div>
                    )}
                  </TableCell>
                )}
                <TableCell className="hidden sm:table-cell text-muted-foreground">
                  {formatDate(expense.createdAt)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    onClick={() => onDeleteExpense(expense.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
