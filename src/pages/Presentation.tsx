import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home,
  Wallet,
  PieChart,
  Target,
  TrendingUp,
  Shield,
  Smartphone,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'BudgetBuddy',
    subtitle: 'Smart Personal Finance Management',
    content: 'A modern web application designed to help users take control of their finances through intuitive budget tracking and expense management.',
    icon: Wallet,
    color: 'from-primary to-pink-400',
  },
  {
    id: 2,
    title: 'Problem Statement',
    subtitle: 'Why Budget Management Matters',
    content: '',
    bullets: [
      '63% of Americans live paycheck to paycheck',
      'Most people don\'t track their spending habits',
      'Traditional budgeting tools are complex and intimidating',
      'Need for simple, intuitive financial management',
    ],
    icon: Target,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 3,
    title: 'Our Solution',
    subtitle: 'Simple Yet Powerful',
    content: '',
    bullets: [
      'Create multiple budget categories easily',
      'Track expenses in real-time',
      'Visual progress indicators',
      'AI-powered financial assistant',
    ],
    icon: Sparkles,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    id: 4,
    title: 'Key Features',
    subtitle: 'What Makes Us Different',
    content: '',
    features: [
      { icon: PieChart, title: 'Visual Budgets', desc: 'Color-coded categories with progress bars' },
      { icon: TrendingUp, title: 'Expense Tracking', desc: 'Log and categorize every expense' },
      { icon: Users, title: 'AI Chat Assistant', desc: 'Get personalized financial advice' },
      { icon: Shield, title: 'Local Storage', desc: 'Your data stays on your device' },
    ],
    icon: CheckCircle2,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    title: 'Technology Stack',
    subtitle: 'Modern Web Technologies',
    content: '',
    techStack: [
      { name: 'React', desc: 'Component-based UI library' },
      { name: 'TypeScript', desc: 'Type-safe JavaScript' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
      { name: 'Vite', desc: 'Fast build tool' },
      { name: 'Lovable Cloud', desc: 'Backend & AI services' },
    ],
    icon: Smartphone,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 6,
    title: 'User Flow',
    subtitle: 'How It Works',
    content: '',
    steps: [
      'Enter your name to get started',
      'Create budget categories (e.g., Food, Transport)',
      'Set budget amounts for each category',
      'Add expenses as you spend',
      'Track progress with visual indicators',
      'Get AI advice when needed',
    ],
    icon: ArrowRight,
    color: 'from-violet-500 to-purple-500',
  },
  {
    id: 7,
    title: 'Future Enhancements',
    subtitle: 'Roadmap',
    content: '',
    bullets: [
      'User authentication & cloud sync',
      'Recurring expense automation',
      'Budget reports & analytics',
      'Mobile app version',
      'Bank integration (optional)',
    ],
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 8,
    title: 'Thank You!',
    subtitle: 'Questions?',
    content: 'BudgetBuddy - Making personal finance simple and accessible for everyone.',
    icon: Sparkles,
    color: 'from-primary to-pink-400',
    isLast: true,
  },
];

export const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const Icon = slide.icon;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-border">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <Home className="w-4 h-4 mr-2" />
            Back to App
          </Button>
        </Link>
        <div className="text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </header>

      {/* Slide Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full animate-fade-in" key={currentSlide}>
          <div className="bg-card rounded-3xl shadow-elevated p-8 sm:p-12">
            {/* Icon */}
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${slide.color} flex items-center justify-center mb-8 mx-auto sm:mx-0`}>
              <Icon className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
              {slide.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {slide.subtitle}
            </p>

            {/* Content */}
            {slide.content && (
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                {slide.content}
              </p>
            )}

            {/* Bullets */}
            {slide.bullets && (
              <ul className="space-y-3">
                {slide.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg text-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Features Grid */}
            {slide.features && (
              <div className="grid sm:grid-cols-2 gap-4">
                {slide.features.map((feature, i) => (
                  <div key={i} className="bg-secondary/50 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            {slide.techStack && (
              <div className="flex flex-wrap gap-3">
                {slide.techStack.map((tech, i) => (
                  <div key={i} className="bg-secondary rounded-xl px-4 py-3">
                    <div className="font-semibold text-foreground">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.desc}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Steps */}
            {slide.steps && (
              <ol className="space-y-3">
                {slide.steps.map((step, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground/80">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-lg">{step}</span>
                  </li>
                ))}
              </ol>
            )}

            {/* CTA on last slide */}
            {slide.isLast && (
              <div className="mt-8">
                <Link to="/">
                  <Button className="gradient-primary">
                    Try BudgetBuddy Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <footer className="p-4 border-t border-border flex justify-between items-center">
        <Button
          variant="outline"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {/* Progress dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === currentSlide ? 'w-6 bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </footer>
    </div>
  );
};

export default Presentation;
