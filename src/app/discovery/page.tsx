import { mockDiscovery } from "@/data/mock-discovery";

/**
 * Enhanced scoring function for bounty discovery ranking.
 * 
 * Components:
 * - fundingScore: Rewards high funding (80%+ = max boost), uses diminishing returns
 * - activityScore: Rewards active bounties (claims indicate interest/viability)
 * - recencyScore: Rewards fresh bounties (decay curve, not linear)
 * - rewardScore: Rewards higher value bounties (log scale to avoid extreme bias)
 * - competitionScore: Penalizes heavily-claimed bounties (more claims = more competition)
 */
function scoreBounty(bounty: typeof mockDiscovery[number], index: number) {
  // Funding score: 0-25 points, weighted toward well-funded bounties
  // Using a sigmoid-like curve: high funding gets bonus, low funding gets minimal points
  const fundingScore = bounty.fundedPercent >= 80 
    ? 25 
    : bounty.fundedPercent >= 50 
      ? 15 + (bounty.fundedPercent - 50) * 0.33 
      : bounty.fundedPercent * 0.3;

  // Activity score: 0-20 points (each claim = 5 points, max 4 claims)
  const activityScore = Math.min(bounty.claimedCount * 5, 20);

  // Recency score: 0-20 points, exponential decay over 14 days
  // Fresh bounties get a significant boost to help new opportunities surface
  const daysSincePosted = bounty.postedDaysAgo;
  const recencyScore = daysSincePosted === 0 
    ? 20 
    : daysSincePosted === 1 
      ? 18 
      : daysSincePosted <= 3 
        ? 15 
        : daysSincePosted <= 7 
          ? 10 
          : daysSincePosted <= 14 
            ? 5 
            : 0;

  // Reward score: 0-20 points, logarithmic scale to avoid extreme reward bias
  // $100 = ~10pts, $500 = ~16pts, $1000 = ~20pts
  const rewardScore = Math.min(20, Math.log1p(bounty.reward) * 3.5);

  // Competition score: 0-15 point penalty based on existing claims
  // High competition = harder to win, so reduce effective score
  // This helps surface underrated opportunities with fewer claimants
  const competitionPenalty = bounty.claimedCount * 3.75;
  
  // Composite score
  const score = fundingScore + activityScore + recencyScore + rewardScore - competitionPenalty;

  // Score breakdown for transparency
  const breakdown = {
    funding: Math.round(fundingScore * 10) / 10,
    activity: Math.round(activityScore * 10) / 10,
    recency: Math.round(recencyScore * 10) / 10,
    reward: Math.round(rewardScore * 10) / 10,
    competitionPenalty: Math.round(competitionPenalty * 10) / 10,
  };

  return { score: Math.round(score * 10) / 10, breakdown };
}

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty, index) => ({ 
      ...bounty, 
      ...scoreBounty(bounty, index) 
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600">
          Bounties ranked by relevance using weighted scoring: funding, activity, recency, reward, and competition.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ranked.map((bounty, idx) => (
          <div key={bounty.id} className="card p-5 relative">
            {/* Rank Badge */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
              {idx + 1}
            </div>
            
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-lg font-semibold pr-6">{bounty.title}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {bounty.tags.map((tag) => (
                    <span key={tag} className="pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-500">Reward</div>
                <div className="text-2xl font-bold text-brand-600">${bounty.reward}</div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50 rounded-lg p-3">
                <div className="text-center">
                  <div className="text-slate-500">Funded</div>
                  <div className="font-semibold text-slate-900">{bounty.fundedPercent}%</div>
                </div>
                <div className="text-center border-l border-r border-slate-200">
                  <div className="text-slate-500">Claims</div>
                  <div className="font-semibold text-slate-900">{bounty.claimedCount}</div>
                </div>
                <div className="text-center">
                  <div className="text-slate-500">Posted</div>
                  <div className="font-semibold text-slate-900">{bounty.postedDaysAgo}d</div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="text-xs text-slate-500 bg-slate-50 rounded-lg p-3 space-y-1">
                <div className="font-semibold text-brand-700 mb-2">
                  Score: {bounty.score.toFixed(1)}
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  <div>+Funding: <span className="text-slate-700">{bounty.breakdown.funding}</span></div>
                  <div>+Activity: <span className="text-slate-700">{bounty.breakdown.activity}</span></div>
                  <div>+Recency: <span className="text-slate-700">{bounty.breakdown.recency}</span></div>
                  <div>+Reward: <span className="text-slate-700">{bounty.breakdown.reward}</span></div>
                  <div className="col-span-2">-Competition: <span className="text-slate-700">{bounty.breakdown.competitionPenalty}</span></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
