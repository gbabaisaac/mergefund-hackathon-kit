import { mockDiscovery } from "@/data/mock-discovery";

// Scoring weights: each factor contributes a percentage of the final 0-100 score.
// Funding (30%) — higher funded bounties are prioritized as they're closer to payout.
// Reward (25%) — higher reward bounties attract more attention; normalized with $500 cap.
// Recency (25%) — newer bounties rank higher; uses a 30-day linear decay window.
// Demand (20%) — more claims signal community interest; each claim adds 15 points (capped at 100).
const WEIGHTS = {
  funding: 0.3,
  reward: 0.25,
  recency: 0.25,
  demand: 0.2,
};

// Normalize each raw bounty field into a 0-100 factor score.
function computeFactors(bounty: (typeof mockDiscovery)[number]) {
  const funding = bounty.fundedPercent;
  const reward = Math.min((bounty.reward / 500) * 100, 100);
  const recency = Math.max(0, ((30 - bounty.postedDaysAgo) / 30) * 100);
  const demand = Math.min(bounty.claimedCount * 15, 100);
  return { funding, reward, recency, demand };
}

// Weighted sum of all factor scores produces the final ranking score (0-100).
function scoreBounty(bounty: (typeof mockDiscovery)[number]) {
  const factors = computeFactors(bounty);
  return (
    factors.funding * WEIGHTS.funding +
    factors.reward * WEIGHTS.reward +
    factors.recency * WEIGHTS.recency +
    factors.demand * WEIGHTS.demand
  );
}

const FACTOR_LABELS: Record<string, { label: string; color: string }> = {
  funding: { label: "Funding", color: "bg-emerald-500" },
  reward: { label: "Reward", color: "bg-amber-500" },
  recency: { label: "Recency", color: "bg-sky-500" },
  demand: { label: "Demand", color: "bg-rose-500" },
};

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty) => ({
      ...bounty,
      score: scoreBounty(bounty),
      factors: computeFactors(bounty),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600">
          Bounties ranked by a weighted scoring algorithm based on funding,
          reward, recency, and demand.
        </p>
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-slate-700">
          Scoring Weights
        </h2>
        <div className="mt-3 flex flex-wrap gap-4">
          {Object.entries(WEIGHTS).map(([key, weight]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span
                className={`inline-block h-2.5 w-2.5 rounded-full ${FACTOR_LABELS[key].color}`}
              />
              <span className="font-medium text-slate-700">
                {FACTOR_LABELS[key].label}
              </span>
              <span className="text-slate-400">{(weight * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ranked.map((bounty, index) => (
          <div key={bounty.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{bounty.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {bounty.tags.map((tag) => (
                      <span key={tag} className="pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Reward</div>
                <div className="text-xl font-bold">${bounty.reward}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-500">
              <div>
                Funded:{" "}
                <span className="font-semibold text-slate-900">
                  {bounty.fundedPercent}%
                </span>
              </div>
              <div>
                Claims:{" "}
                <span className="font-semibold text-slate-900">
                  {bounty.claimedCount}
                </span>
              </div>
              <div>
                Posted:{" "}
                <span className="font-semibold text-slate-900">
                  {bounty.postedDaysAgo}d ago
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-600">Score</span>
                <span className="font-bold text-brand-700">
                  {bounty.score.toFixed(1)}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-slate-100">
                <div
                  className="h-2 rounded-full bg-brand-600 transition-all"
                  style={{ width: `${bounty.score}%` }}
                />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries(bounty.factors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <span className="w-14 text-slate-500">
                    {FACTOR_LABELS[key].label}
                  </span>
                  <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                    <div
                      className={`h-1.5 rounded-full ${FACTOR_LABELS[key].color} transition-all`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="w-7 text-right text-slate-400">
                    {value.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
