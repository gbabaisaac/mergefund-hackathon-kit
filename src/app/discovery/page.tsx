import { mockDiscovery } from "@/data/mock-discovery";

type DiscoveryBounty = typeof mockDiscovery[number];

function calculateScoreBreakdown(bounty: DiscoveryBounty) {
  // Funding signals sponsor confidence. Cap the boost so one highly funded bounty
  // does not overwhelm active, recent opportunities.
  const funding = Math.min(bounty.fundedPercent, 100) * 0.3;

  // Activity suggests market demand, but each additional claim matters a little
  // less so crowded bounties do not always dominate the list.
  const activity = Math.sqrt(bounty.claimedCount) * 12;

  // Newer bounties should surface while they are still actionable.
  const recency = Math.max(0, 14 - bounty.postedDaysAgo) * 1.5;

  // Reward is important, but scaled down to avoid turning discovery into a
  // simple highest-dollar sort.
  const reward = bounty.reward * 0.06;

  return { funding, activity, recency, reward };
}

function scoreBounty(bounty: typeof mockDiscovery[number]) {
  const breakdown = calculateScoreBreakdown(bounty);
  return Object.values(breakdown).reduce((total, value) => total + value, 0);
}

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty) => ({
      ...bounty,
      score: scoreBounty(bounty),
      scoreBreakdown: calculateScoreBreakdown(bounty),
    }))
    .sort((a, b) => {
      const scoreDiff = b.score - a.score;
      if (scoreDiff !== 0) return scoreDiff;
      return b.reward - a.reward;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600">
          Improve or replace the scoring function to rank bounties by relevance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ranked.map((bounty) => (
          <div key={bounty.id} className="card p-5">
            <div className="flex items-start justify-between gap-4">
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
            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                Score: <span className="font-semibold text-brand-700">{bounty.score.toFixed(1)}</span>
              </span>
              <span className="text-right">
                Funding {bounty.scoreBreakdown.funding.toFixed(1)} · Activity{" "}
                {bounty.scoreBreakdown.activity.toFixed(1)} · Recency{" "}
                {bounty.scoreBreakdown.recency.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
