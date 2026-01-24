import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface BudgetFormProps {
  onCreateBudget: (name: string, amount: number) => void;
}

export const BudgetForm = ({ onCreateBudget }: BudgetFormProps) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && amount) {
      onCreateBudget(name.trim(), parseFloat(amount));
      setName('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl shadow-card animate-scale-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Create Budget</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budgetName">Budget Name</Label>
          <Input
            id="budgetName"
            type="text"
            placeholder="e.g., Groceries"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budgetAmount">Amount</Label>
          <Input
            id="budgetAmount"
            type="number"
            placeholder="e.g., 500"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full mt-4 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Budget
      </Button>
    </form>
  );
};
