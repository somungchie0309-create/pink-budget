import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Wallet, 
  PieChart, 
  MessageSquare, 
  Shield, 
  Zap,
  Heart,
  ArrowRight,
  CheckCircle2,
  Presentation
} from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Multiple Budgets',
    description: 'Create separate budgets for different spending categories like groceries, entertainment, or transportation.',
  },
  {
    icon: PieChart,
    title: 'Visual Tracking',
    description: 'See your spending progress at a glance with intuitive progress bars and color-coded categories.',
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant',
    description: 'Get personalized financial advice and tips from our intelligent chatbot assistant.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your financial data stays on your device. We don\'t store or share your sensitive information.',
  },
  {
    icon: Zap,
    title: 'Fast & Simple',
    description: 'No complex setup required. Start tracking your expenses in seconds with our intuitive interface.',
  },
  {
    icon: Heart,
    title: 'Free to Use',
    description: 'All core features are completely free. No hidden fees, no subscriptions required.',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Create Your Profile',
    description: 'Enter your name to get started. Your data is stored locally on your device.',
  },
  {
    step: 2,
    title: 'Set Up Budgets',
    description: 'Create budget categories for your spending areas and set monthly limits.',
  },
  {
    step: 3,
    title: 'Track Expenses',
    description: 'Log your expenses as you spend. Assign each expense to a budget category.',
  },
  {
    step: 4,
    title: 'Stay on Track',
    description: 'Monitor your progress, get AI-powered advice, and achieve your financial goals.',
  },
];

export const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">BudgetBuddy</span>
          </Link>
          <div className="flex gap-3">
            <Link to="/presentation">
              <Button variant="outline" size="sm">
                <Presentation className="w-4 h-4 mr-2" />
                Presentation
              </Button>
            </Link>
            <Link to="/">
              <Button size="sm" className="gradient-primary">
                <Home className="w-4 h-4 mr-2" />
                Go to App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Simple & Effective Budget Tracking</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Take Control of Your{' '}
            <span className="text-primary">Finances</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            BudgetBuddy helps you create budgets, track expenses, and achieve your financial goals with an intuitive, easy-to-use interface.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="gradient-primary">
                Start Budgeting Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/presentation">
              <Button size="lg" variant="outline">
                View Presentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make budgeting simple and effective.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Get started in just a few simple steps.
            </p>
          </div>
          <div className="space-y-6">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="flex gap-6 items-start bg-card rounded-2xl p-6 shadow-card"
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-primary rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join thousands of users who have taken control of their finances with BudgetBuddy.
            </p>
            <Link to="/">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">BudgetBuddy</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ for better financial health
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
