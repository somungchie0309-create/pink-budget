import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Wallet, TrendingUp, PiggyBank } from 'lucide-react';

interface IntroProps {
  onCreateUser: (userName: string) => void;
}

export const Intro = ({ onCreateUser }: IntroProps) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onCreateUser(userName.trim());
    }
  };

  const features = [
    {
      icon: Wallet,
      title: 'Create Budgets',
      description: 'Set up budgets for different spending categories',
    },
    {
      icon: TrendingUp,
      title: 'Track Expenses',
      description: 'Log your spending and see where your money goes',
    },
    {
      icon: PiggyBank,
      title: 'Save More',
      description: 'Stay on track and reach your financial goals',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-lg text-center">
        {/* Logo and Title */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary shadow-elevated mb-6">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Budget<span className="text-primary">Bloom</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Take control of your finances with ease
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-4 mb-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="bg-card p-6 rounded-2xl shadow-card">
            <label htmlFor="userName" className="block text-sm font-medium text-foreground mb-2 text-left">
              What's your name?
            </label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mb-4"
              required
            />
            <Button 
              type="submit" 
              className="w-full gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
