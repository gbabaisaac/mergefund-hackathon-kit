const transactions = [
  { id: 1, date: "May 30", merchant: "Acme Payroll", category: "Income", amount: 3200 },
  { id: 2, date: "May 29", merchant: "City Rent", category: "Housing", amount: -1200 },
  { id: 3, date: "May 28", merchant: "Fresh Market", category: "Groceries", amount: -86 },
  { id: 4, date: "May 27", merchant: "Metro Card", category: "Transport", amount: -42 },
  { id: 5, date: "May 26", merchant: "Design Freelance", category: "Income", amount: 640 },
  { id: 6, date: "May 25", merchant: "Cloud Tools", category: "Software", amount: -34 },
];

const budgets = [
  { name: "Housing", spent: 1200, limit: 1400 },
  { name: "Groceries", spent: 420, limit: 550 },
  { name: "Transport", spent: 132, limit: 180 },
  { name: "Software", spent: 94, limit: 120 },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function PersonalFinanceTrackerPage() {
  const income = transactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const expenses = Math.abs(transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
  const savingsRate = Math.round(((income - expenses) / income) * 100);

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-slate-950 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-100">Personal finance</p>
            <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Track cash flow, budgets, and savings.</h1>
            <p className="mt-4 max-w-2xl text-brand-50">A responsive dashboard with mock data for monthly income, spending, category budgets, and recent transactions.</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-sm text-brand-100">Savings rate</p>
            <p className="text-4xl font-bold">{savingsRate}%</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{ label: "Income", value: income }, { label: "Expenses", value: expenses }, { label: "Net saved", value: income - expenses }].map((card) => (
          <div key={card.label} className="card p-5">
            <p className="text-sm text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-bold">{formatCurrency(card.value)}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">Budget progress</h2>
          <div className="mt-5 space-y-5">
            {budgets.map((budget) => {
              const percent = Math.min(100, Math.round((budget.spent / budget.limit) * 100));
              return (
                <div key={budget.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">{budget.name}</span>
                    <span className="text-slate-500">{formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-6 dark:border-slate-700">
            <h2 className="text-xl font-semibold">Recent transactions</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-2 gap-3 p-4 text-sm sm:grid-cols-4 sm:items-center">
                <span className="text-slate-500">{transaction.date}</span>
                <span className="font-medium sm:col-span-1">{transaction.merchant}</span>
                <span className="pill w-fit">{transaction.category}</span>
                <span className={`text-right font-bold ${transaction.amount > 0 ? "text-emerald-600" : "text-slate-900 dark:text-slate-100"}`}>
                  {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
