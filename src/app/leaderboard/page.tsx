import { mockLeaderboard } from "@/data/mock-leaderboard";

export default function LeaderboardPage() {
  // FIX: Stable sort using secondary key for deterministic ordering when earnings tie.
  const sorted = [...mockLeaderboard].toSorted((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.bounties !== a.bounties) return b.bounties - a.bounties;
    return b.reputation - a.reputation; // tertiary tiebreaker
  });

  // FIX: Compute rank with proper tie handling — users with same earnings share the same rank.
  let prevEarned: number | null = null;
  let prevRank = 0;
  const getRank = (index: number, earned: number): number => {
    if (earned !== prevEarned) {
      prevRank = index + 1;
      prevEarned = earned;
    }
    return prevRank;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Top developers ranked by total earned bounty rewards.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-5 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:border-slate-700">
          <div>Rank</div>
          <div className="col-span-2">Developer</div>
          <div>Bounties</div>
          <div>Total Earned</div>
        </div>
        {sorted.map((dev, index) => {
          const rank = getRank(index, dev.earned);
          return (
            <div
              key={dev.id}
              className="grid grid-cols-5 gap-3 px-5 py-4 text-sm border-b border-slate-100 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800 transition dark:border-slate-800"
            >
              <div className="font-semibold">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-1
                  ${rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" :
                    rank === 2 ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300" :
                    rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" :
                    "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
                  {rank}
                </span>
              </div>
              <div className="col-span-2">
                <div className="font-semibold dark:text-slate-100">{dev.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Reputation {dev.reputation}</div>
              </div>
              <div className="dark:text-slate-300">{dev.bounties}</div>
              <div className="font-bold text-green-600 dark:text-green-400">${dev.earned.toLocaleString()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
