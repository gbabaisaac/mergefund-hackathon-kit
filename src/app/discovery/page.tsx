import { mockDiscovery } from "@/data/mock-discovery";
import { rankBounties, scoreMaximums } from "@/lib/discovery-score";

export default function DiscoveryPage() {
  const ranked = rankBounties(mockDiscovery);

  return (
    <div className="space-y-8">
      <div>
        <span className="pill border-brand-200 text-brand-700 dark:border-brand-700 dark:text-brand-300">Marketplace intelligence</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Discovery Algorithm</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
          A deterministic, explainable ranking that balances reward, funding health, availability, and recency instead of rewarding only the loudest bounty.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(scoreMaximums).map(([label, value]) => (
          <div key={label} className="card p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{value} pts</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {ranked.map((bounty, index) => (
          <article key={bounty.id} className="card p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Rank #{index + 1}</div>
                    <h3 className="text-lg font-semibold">{bounty.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Score</div>
                    <div className="text-3xl font-bold text-brand-700 dark:text-brand-300">{bounty.score.total.toFixed(1)}</div>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {bounty.tags.map((tag) => (
                    <span key={tag} className="pill">{tag}</span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <div>Reward <span className="font-semibold text-slate-900 dark:text-slate-100">${bounty.reward}</span></div>
                  <div>Funded <span className="font-semibold text-slate-900 dark:text-slate-100">{bounty.fundedPercent}%</span></div>
                  <div>Claims <span className="font-semibold text-slate-900 dark:text-slate-100">{bounty.claimedCount}</span></div>
                </div>
              </div>
              <div className="grid w-full gap-2 lg:max-w-sm">
                {Object.entries(bounty.score)
                  .filter(([key]) => key !== "total")
                  .map(([key, value]) => (
                    <div key={key}>
                      <div className="mb-1 flex justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        <span>{key}</span><span>{value.toFixed(1)}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="h-full rounded-full bg-brand-600" style={{ width: `${(value / scoreMaximums[key as keyof typeof scoreMaximums]) * 100}%` }} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
