import { mockLeaderboard } from "@/data/mock-leaderboard";

export default function LeaderboardPage() {
  // Stable sort: primary by earned (desc), secondary by id (asc) for deterministic tie-breaking
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    return a.id.localeCompare(b.id);
  });

  // Assign ranks with proper tie handling: same earnings = same rank
  let currentRank = 0;
  let prevEarned: number | null = null;
  const ranked = sorted.map((dev) => {
    if (dev.earned !== prevEarned) {
      currentRank++;
    }
    const rank = currentRank;
    prevEarned = dev.earned;
    return { dev, rank };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Top developers ranked by total earnings. Tied earners share the same rank.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-5 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">
          <div>Rank</div>
          <div className="col-span-2">Developer</div>
          <div>Bounties</div>
          <div>Total Earned</div>
        </div>
        {ranked.map(({ dev, rank }) => (
          <div
            key={dev.id}
            className="grid grid-cols-5 gap-3 px-5 py-4 text-sm border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
          >
            <div className="font-semibold">#{rank}</div>
            <div className="col-span-2">
              <div className="font-semibold">{dev.name}</div>
              <div className="text-xs text-slate-500">Reputation {dev.reputation}</div>
            </div>
            <div>{dev.bounties}</div>
            <div className="font-bold text-green-600">${dev.earned.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
