import { mockDiscovery } from "@/data/mock-discovery";
import { scoreBounty, getBountyScoreExplanation } from "@/utils/bountyScoring";

export default function DiscoveryPage() {
  const ranked = [...mockDiscovery]
    .map((bounty) => {
      const explanation = getBountyScoreExplanation(bounty);
      return {
        ...bounty,
        score: explanation.total,
        scoreBreakdown: explanation.breakdown,
        scoreDetails: explanation.details,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600 mt-2">
          Advanced multi-factor ranking system based on reward, funding, competition, recency, and tag relevance.
        </p>
        <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">Algorithm Weights:</h3>
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <li>💰 Reward: 25pts</li>
            <li>📊 Funding: 30pts</li>
            <li>🎯 Competition: 20pts</li>
            <li>⏰ Recency: 15pts</li>
            <li>🏷️ Tags: 10pts</li>
          </ul>
        </div>
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
            <div className="mt-3 border-t pt-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-brand-700">
                  Score: {bounty.score}/100
                </div>
              </div>
              
              {/* Score Breakdown */}
              <div className="mt-2 grid grid-cols-5 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-medium text-slate-700">{bounty.scoreBreakdown.reward}</div>
                  <div className="text-slate-500">Reward</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-700">{bounty.scoreBreakdown.funding}</div>
                  <div className="text-slate-500">Funding</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-700">{bounty.scoreBreakdown.competition}</div>
                  <div className="text-slate-500">Competition</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-700">{bounty.scoreBreakdown.recency}</div>
                  <div className="text-slate-500">Recency</div>
                </div>
                <div className="text-center">
                  <div className="font-medium text-slate-700">{bounty.scoreBreakdown.tags}</div>
                  <div className="text-slate-500">Tags</div>
                </div>
              </div>
              
              {/* Detailed Breakdown */}
              <div className="mt-2 p-2 bg-slate-50 rounded text-xs space-y-1">
                {bounty.scoreDetails.map((detail, i) => (
                  <div key={i} className="text-slate-600">{detail}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
