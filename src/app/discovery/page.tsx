import { mockDiscovery } from "@/data/mock-discovery";

type DiscoveryBounty = (typeof mockDiscovery)[number];

type ScoredBounty = DiscoveryBounty & {
  score: number;
  components: {
    rewardWeight: number;
    fundedWeight: number;
    claimsWeight: number;
    freshnessWeight: number;
  };
};

/**
 * Bounty ranking strategy:
 * - rewardWeight: bigger rewards are more attractive for participants
 *   scaled to 0~40 points using reward / 15.
 * - fundedWeight: high funding completion means this bounty is near goal/clearer intent.
 *   weighted with capped linear scale 0~30 points.
 * - claimsWeight: recent claims indicate active interest, social proof.
 *   each claim adds 2 points.
 * - freshnessWeight: newer posts are preferred. Recency decays 1.8pt / day up to 14 days.
 *   old entries older than 14 days score 0 in this dimension.
 *
 * Total score keeps all components bounded so one large value cannot dominate everything.
 */
function scoreBounty(bounty: DiscoveryBounty): ScoredBounty {
  const rewardWeight = Math.min(40, bounty.reward / 15); // e.g. $600 => 40 cap
  const fundedWeight = (Math.min(100, Math.max(0, bounty.fundedPercent)) / 100) * 30;
  const claimsWeight = Math.min(20, bounty.claimedCount * 2);
  const freshnessWeight = Math.max(0, 25 - bounty.postedDaysAgo * 1.8);

  return {
    ...bounty,
    score: rewardWeight + fundedWeight + claimsWeight + freshnessWeight,
    components: {
      rewardWeight,
      fundedWeight,
      claimsWeight,
      freshnessWeight,
    },
  };
}

export default function DiscoveryPage() {
  const ranked = mockDiscovery
    .map(scoreBounty)
    .sort((a, b) => {
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      // Deterministic tie-breakers: higher reward first, then newer posted.
      if (a.reward !== b.reward) return b.reward - a.reward;
      return a.postedDaysAgo - b.postedDaysAgo;
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600">
          Ranking by weighted score across reward, funding progress, community claims, and freshness.
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

            <div className="mt-4 grid gap-2 text-xs text-slate-600 sm:grid-cols-2 lg:grid-cols-4">
              <p>
                Funded: <span className="font-semibold text-slate-900">{bounty.fundedPercent}%</span>
              </p>
              <p>
                Claims: <span className="font-semibold text-slate-900">{bounty.claimedCount}</span>
              </p>
              <p>
                Posted: <span className="font-semibold text-slate-900">{bounty.postedDaysAgo}d ago</span>
              </p>
              <p>
                Score: <span className="font-semibold text-brand-700">{bounty.score.toFixed(1)}</span>
              </p>
            </div>

            <div className="mt-3 space-y-1 text-[11px] text-slate-500">
              <p>
                rewardWeight: <span className="font-semibold text-slate-900">{bounty.components.rewardWeight.toFixed(1)}</span>,
                fundedWeight: <span className="font-semibold text-slate-900">{bounty.components.fundedWeight.toFixed(1)}</span>,
                claimsWeight: <span className="font-semibold text-slate-900">{bounty.components.claimsWeight.toFixed(1)}</span>,
                freshnessWeight: <span className="font-semibold text-slate-900">{bounty.components.freshnessWeight.toFixed(1)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
