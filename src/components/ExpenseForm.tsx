import { useState } from 'react';
import { Budget } from '@/lib/budget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface ExpenseFormProps {
  budgets: Budget[];
  onCreateExpense: (budgetId: string, name: string, amount: number) => void;
  selectedBudgetId?: string;
}

export const ExpenseForm = ({ budgets, onCreateExpense, selectedBudgetId }: ExpenseFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState(selectedBudgetId || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && amount && budgetId) {
      onCreateExpense(budgetId, name.trim(), parseFloat(amount));
      setName('');
      setAmount('');
      if (!selectedBudgetId) {
        setBudgetId('');
      }
    }
  };

  if (budgets.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl shadow-card animate-scale-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Add Expense</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="expenseName">Expense Name</Label>
          <Input
            id="expenseName"
            type="text"
            placeholder="e.g., Coffee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenseAmount">Amount</Label>
          <Input
            id="expenseAmount"
            type="number"
            placeholder="e.g., 5.00"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        {!selectedBudgetId && (
          <div className="space-y-2">
            <Label htmlFor="expenseBudget">Budget</Label>
            <Select value={budgetId} onValueChange={setBudgetId} required>
              <SelectTrigger id="expenseBudget">
                <SelectValue placeholder="Select budget" />
              </SelectTrigger>
              <SelectContent>
                {budgets.map((budget) => (
                  <SelectItem key={budget.id} value={budget.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: budget.color }}
                      />
                      {budget.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <Button 
        type="submit" 
        className="w-full mt-4 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        disabled={!selectedBudgetId && !budgetId}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Expense
      </Button>
    </form>
  );
};
