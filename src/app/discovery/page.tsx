import { mockDiscovery } from "@/data/mock-discovery";
import { rankDiscoveryBounties } from "@/lib/discovery-ranking";

export default function DiscoveryPage() {
  const ranked = rankDiscoveryBounties(mockDiscovery);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600">
          Ranked bounties balance payout readiness, reward size, recency, competition, and matching signals.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ranked.map((bounty, index) => (
          <div key={bounty.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                  Rank #{index + 1}
                </div>
                <h3 className="mt-1 text-lg font-semibold">{bounty.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {bounty.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Reward</div>
                <div className="text-xl font-bold">${bounty.reward}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-500">
              <div>
                Funded: <span className="font-semibold text-slate-900">{bounty.fundedPercent}%</span>
              </div>
              <div>
                Claims: <span className="font-semibold text-slate-900">{bounty.claimedCount}</span>
              </div>
              <div>
                Posted: <span className="font-semibold text-slate-900">{bounty.postedDaysAgo}d ago</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Discovery score
                </span>
                <span className="text-lg font-bold text-brand-700">{bounty.score.toFixed(1)}</span>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                {Object.entries(bounty.factors).map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="capitalize">{label.replace(/([A-Z])/g, " $1")}</span>
                    <span className="font-semibold text-slate-900">{value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
