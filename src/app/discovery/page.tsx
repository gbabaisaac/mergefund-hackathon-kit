import { mockDiscovery } from "@/data/mock-discovery";

function scoreBounty(bounty: typeof mockDiscovery[number]) {
  const fundedBoost = bounty.fundedPercent >= 80 ? 20 : bounty.fundedPercent / 4;
  const activityBoost = bounty.claimedCount * 5;
  const recencyBoost = Math.max(0, 14 - bounty.postedDaysAgo);
  return fundedBoost + activityBoost + recencyBoost + bounty.reward / 50;
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
