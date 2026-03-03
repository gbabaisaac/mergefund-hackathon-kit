import { mockLeaderboard } from "@/data/mock-leaderboard";

type SortKey = "earned";

function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function LeaderboardPage() {
  const sortBy: SortKey = "earned";
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b[sortBy] !== a[sortBy]) return b[sortBy] - a[sortBy];
    if (b.reputation !== a.reputation) return b.reputation - a.reputation;
    return b.bounties - a.bounties;
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Ranked by total earned. Includes completed bounties and reputation score.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="hidden grid-cols-12 gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 md:grid">
          <div className="col-span-1">Rank</div>
          <div className="col-span-4">Developer</div>
          <div className="col-span-2">Bounties</div>
          <div className="col-span-3">Total earned</div>
          <div className="col-span-2">Reputation</div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {sorted.map((dev, index) => (
            <article key={dev.id} className="px-4 py-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-12 md:items-center md:gap-3">
                <div className="md:col-span-1">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    #{index + 1}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <div className="font-medium text-slate-900 dark:text-slate-100">{dev.name}</div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{dev.bounties}</div>
                  <div className="text-xs text-slate-500">completed</div>
                </div>

                <div className="md:col-span-3">
                  <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{formatUsd(dev.earned)}</div>
                </div>

                <div className="md:col-span-2">
                  <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{dev.reputation}</div>
                  <div className="text-xs text-slate-500">score</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
