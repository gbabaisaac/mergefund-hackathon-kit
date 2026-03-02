import { mockDiscovery } from "@/data/mock-discovery";

/**
 * Enhanced Bounty Discovery Algorithm
 * 
 * Scoring factors (weights):
 * 1. Reward amount (30%) - Higher rewards attract more attention
 * 2. Funding progress (20%) - Nearly funded bounties are prioritized
 * 3. Activity level (20%) - More claims = more popular
 * 4. Recency (15%) - Fresh bounties get boost
 * 5. Difficulty balance (10%) - Medium difficulty preferred
 * 6. Tag diversity (5%) - More tags = better discoverability
 * 
 * Total score: 0-100 (normalized)
 */

function scoreBounty(bounty: typeof mockDiscovery[number]): number {
  // Normalize each factor to 0-100 scale
  
  // 1. Reward score (30% weight)
  // Assume max reward is $1000, normalize to 0-100
  const rewardScore = Math.min(100, (bounty.reward / 1000) * 100);
  
  // 2. Funding progress score (20% weight)
  // Boost bounties that are 50-90% funded (sweet spot for completion)
  let fundingScore = bounty.fundedPercent;
  if (bounty.fundedPercent >= 50 && bounty.fundedPercent < 90) {
    fundingScore += 20; // Bonus for "almost there" bounties
  } else if (bounty.fundedPercent >= 90) {
    fundingScore += 10; // Smaller bonus for nearly complete
  }
  fundingScore = Math.min(100, fundingScore);
  
  // 3. Activity score (20% weight)
  // More claims = more interest, but diminishing returns
  // Assume max 20 claims is "very active"
  const activityScore = Math.min(100, (bounty.claimedCount / 20) * 100);
  
  // 4. Recency score (15% weight)
  // Fresh bounties get higher score, decay over 30 days
  let recencyScore = Math.max(0, 100 - (bounty.postedDaysAgo / 30) * 100);
  // Boost brand new bounties (< 3 days)
  if (bounty.postedDaysAgo < 3) {
    recencyScore += 20;
  }
  recencyScore = Math.min(100, recencyScore);
  
  // 5. Difficulty score (10% weight)
  // Medium difficulty is the "sweet spot" - not too easy, not too hard
  // Map difficulty to score: Easy=60, Medium=100, Hard=75
  const difficultyMap: Record<string, number> = {
    "Easy": 60,
    "Medium": 100,
    "Hard": 75,
  };
  const difficultyScore = difficultyMap[bounty.difficulty] || 50;
  
  // 6. Tag diversity score (5% weight)
  // More tags = better discoverability, max 5 tags for full score
  const tagScore = Math.min(100, (bounty.tags.length / 5) * 100);
  
  // Calculate weighted final score
  const finalScore = 
    rewardScore * 0.30 +
    fundingScore * 0.20 +
    activityScore * 0.20 +
    recencyScore * 0.15 +
    difficultyScore * 0.10 +
    tagScore * 0.05;
  
  return Math.round(finalScore * 10) / 10; // Round to 1 decimal
}

// Score breakdown for display
function getScoreBreakdown(bounty: typeof mockDiscovery[number]) {
  const rewardScore = Math.min(100, (bounty.reward / 1000) * 100);
  let fundingScore = bounty.fundedPercent;
  if (bounty.fundedPercent >= 50 && bounty.fundedPercent < 90) fundingScore += 20;
  else if (bounty.fundedPercent >= 90) fundingScore += 10;
  fundingScore = Math.min(100, fundingScore);
  
  const activityScore = Math.min(100, (bounty.claimedCount / 20) * 100);
  let recencyScore = Math.max(0, 100 - (bounty.postedDaysAgo / 30) * 100);
  if (bounty.postedDaysAgo < 3) recencyScore += 20;
  recencyScore = Math.min(100, recencyScore);
  
  const difficultyMap: Record<string, number> = { "Easy": 60, "Medium": 100, "Hard": 75 };
  const difficultyScore = difficultyMap[bounty.difficulty] || 50;
  const tagScore = Math.min(100, (bounty.tags.length / 5) * 100);
  
  return {
    reward: Math.round(rewardScore * 0.30 * 10) / 10,
    funding: Math.round(fundingScore * 0.20 * 10) / 10,
    activity: Math.round(activityScore * 0.20 * 10) / 10,
    recency: Math.round(recencyScore * 0.15 * 10) / 10,
    difficulty: Math.round(difficultyScore * 0.10 * 10) / 10,
    tags: Math.round(tagScore * 0.05 * 10) / 10,
  };
}

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty) => ({ 
      ...bounty, 
      score: scoreBounty(bounty),
      breakdown: getScoreBreakdown(bounty),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600">
          Enhanced scoring algorithm with weighted factors for better bounty discovery.
        </p>
      </div>

      {/* Algorithm explanation */}
      <div className="card p-4 bg-slate-50">
        <h3 className="font-semibold text-sm mb-2">📊 Scoring Factors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded"></span>
            Reward (30%)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded"></span>
            Funding (20%)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-500 rounded"></span>
            Activity (20%)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded"></span>
            Recency (15%)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-pink-500 rounded"></span>
            Difficulty (10%)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-cyan-500 rounded"></span>
            Tags (5%)
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ranked.map((bounty, index) => (
          <div key={bounty.id} className="card p-5 relative">
            {/* Rank badge */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
              #{index + 1}
            </div>
            
            <div className="flex items-start justify-between gap-4 pr-10">
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
            
            {/* Score display */}
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Score: <span className="font-bold text-brand-700 text-base">{bounty.score}</span>
                <span className="text-slate-400">/100</span>
              </div>
              <span className={`pill ${
                bounty.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                bounty.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {bounty.difficulty}
              </span>
            </div>
            
            {/* Score breakdown (expandable) */}
            <details className="mt-3">
              <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600">
                View score breakdown
              </summary>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-blue-50 rounded">
                  <div className="text-blue-600 font-semibold">Reward</div>
                  <div className="text-blue-800">+{bounty.breakdown.reward}</div>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <div className="text-green-600 font-semibold">Funding</div>
                  <div className="text-green-800">+{bounty.breakdown.funding}</div>
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <div className="text-purple-600 font-semibold">Activity</div>
                  <div className="text-purple-800">+{bounty.breakdown.activity}</div>
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <div className="text-orange-600 font-semibold">Recency</div>
                  <div className="text-orange-800">+{bounty.breakdown.recency}</div>
                </div>
                <div className="p-2 bg-pink-50 rounded">
                  <div className="text-pink-600 font-semibold">Difficulty</div>
                  <div className="text-pink-800">+{bounty.breakdown.difficulty}</div>
                </div>
                <div className="p-2 bg-cyan-50 rounded">
                  <div className="text-cyan-600 font-semibold">Tags</div>
                  <div className="text-cyan-800">+{bounty.breakdown.tags}</div>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
