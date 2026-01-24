import { Intro } from '@/components/Intro';
import { Dashboard } from '@/components/Dashboard';
import { useBudget } from '@/hooks/useBudget';

const Index = () => {
  const {
    user,
    budgets,
    expenses,
    isLoading,
    createUser,
    deleteUser,
    createBudget,
    deleteBudget,
    createExpense,
    deleteExpense,
  } = useBudget();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Intro onCreateUser={createUser} />;
  }

  return (
    <Dashboard
      userName={user.userName}
      budgets={budgets}
      expenses={expenses}
      onCreateBudget={createBudget}
      onDeleteBudget={deleteBudget}
      onCreateExpense={createExpense}
      onDeleteExpense={deleteExpense}
      onDeleteUser={deleteUser}
    />
  );
};

export default Index;
