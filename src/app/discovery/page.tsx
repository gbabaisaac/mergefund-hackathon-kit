import { mockDiscovery } from "@/data/mock-discovery";

/**
 * Enhanced scoring function for bounty relevance.
 * Logic:
 * 1. Reward Weight (40%): Logarithmic scaling ensures higher rewards are prioritized without 
 *    overshadowing small tasks. log2(reward) * 5.
 * 2. Funding Status (30%): Higher funding percentage increases confidence. fundedPercent / 5.
 * 3. Recency (20%): Newer bounties need more exposure. Linear decay over 30 days. max(0, 30 - postedDaysAgo) / 2.
 * 4. Activity/Trending (10%): Shows community validation. claimedCount * 2.
 */
function scoreBounty(bounty: typeof mockDiscovery[number]) {
  const rewardFactor = Math.log2(Math.max(1, bounty.reward)) * 5;
  const fundingFactor = bounty.fundedPercent / 5;
  const recencyFactor = Math.max(0, 30 - bounty.postedDaysAgo) / 2;
  const activityFactor = bounty.claimedCount * 2;
  
  return rewardFactor + fundingFactor + recencyFactor + activityFactor;
}

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty) => ({ ...bounty, score: scoreBounty(bounty) }))
    .sort((a, b) => b.score - a.score);

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
