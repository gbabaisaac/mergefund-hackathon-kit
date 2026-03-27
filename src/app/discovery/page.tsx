import { mockDiscovery } from "@/data/mock-discovery";
import { rankBounties, ScoredBounty } from "@/lib/discovery-algorithm";

export default function DiscoveryPage() {
  const ranked = rankBounties(mockDiscovery);

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">Discovery Algorithm</h1>
        <p className="text-slate-600 mt-2">
          Bounties ranked by relevance using a multi-factor scoring system.
        </p>
        <div className="mt-4 p-4 bg-slate-50 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">Scoring Factors (0-100 total):</h3>
          <ul className="grid gap-1 md:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-blue-500"></span>
              Funding Progress (0-30 pts)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-green-500"></span>
              Activity Level (0-25 pts)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500"></span>
              Recency (0-20 pts)
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-purple-500"></span>
              Reward Amount (0-25 pts)
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4">
        {ranked.map((bounty, index) => (
          <BountyCard key={bounty.id} bounty={bounty} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}

function BountyCard({ bounty, rank }: { bounty: ScoredBounty; rank: number }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
              #{rank}
            </span>
            <h3 className="text-lg font-semibold">{bounty.title}</h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 ml-11">
            {bounty.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm text-slate-500">Reward</div>
          <div className="text-2xl font-bold text-green-600">${bounty.reward}</div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="mt-4 ml-11 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-slate-500">Funded</div>
          <div className="font-semibold">{bounty.fundedPercent}%</div>
        </div>
        <div>
          <div className="text-slate-500">Claims</div>
          <div className="font-semibold">{bounty.claimedCount}</div>
        </div>
        <div>
          <div className="text-slate-500">Posted</div>
          <div className="font-semibold">{bounty.postedDaysAgo}d ago</div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="mt-4 ml-11">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-slate-500">Total Score:</span>
          <span className="text-lg font-bold text-brand-600">{bounty.score}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-xs">
          <ScoreBar label="Funding" score={bounty.scoreBreakdown.funding} max={30} color="blue" />
          <ScoreBar label="Activity" score={bounty.scoreBreakdown.activity} max={25} color="green" />
          <ScoreBar label="Recency" score={bounty.scoreBreakdown.recency} max={20} color="amber" />
          <ScoreBar label="Reward" score={bounty.scoreBreakdown.reward} max={25} color="purple" />
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ 
  label, 
  score, 
  max, 
  color 
}: { 
  label: string; 
  score: number; 
  max: number; 
  color: "blue" | "green" | "amber" | "purple" 
}) {
  const percent = (score / max) * 100;
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
  };

  return (
    <div>
      <div className="flex justify-between text-slate-500 mb-1">
        <span>{label}</span>
        <span className="font-medium text-slate-700">{score}</span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${colorClasses[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
