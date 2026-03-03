import { mockDiscovery } from "@/data/mock-discovery";

function scoreBounty(bounty: typeof mockDiscovery[number]) {
  // Weighted discovery score (0-100+), optimized for relevance:
  // - reward component: normalize bounty payout to 0-30 points (higher reward = higher priority)
  // - funded component: 0-25 points (funded bounties are more actionable)
  // - activity component: 0-25 points (more claimant interest indicates demand)
  // - recency component: 0-20 points (newer bounties surface more often)
  const rewardScore = Math.min(30, (bounty.reward / 500) * 30);
  const fundedScore = (bounty.fundedPercent / 100) * 25;
  const activityScore = Math.min(25, bounty.claimedCount * 6);
  const recencyScore = Math.max(0, 20 - bounty.postedDaysAgo * 2);

  return rewardScore + fundedScore + activityScore + recencyScore;
}

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty) => ({
      ...bounty,
      score: scoreBounty(bounty),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      // Stable tie-breakers for deterministic ordering
      if (b.reward !== a.reward) return b.reward - a.reward;
      return a.postedDaysAgo - b.postedDaysAgo;
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
            <div className="mt-3 text-xs text-slate-500">
              Score: <span className="font-semibold text-brand-700">{bounty.score.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
