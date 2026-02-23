import { mockLeaderboard } from "@/data/mock-leaderboard";

export default function LeaderboardPage() {
  // Sort by earned (descending), then by reputation (descending) for stable ordering
  // Fixes sorting bug: when earned values match, order becomes non-deterministic
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) {
      return b.earned - a.earned;
    }
    // Secondary sort key: reputation (higher first) ensures deterministic order
    return b.reputation - a.reputation;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Build a leaderboard UI with sorting and ranking logic.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-5 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">
          <div>Rank</div>
          <div className="col-span-2">Developer</div>
          <div>Bounties</div>
          <div>Total Earned</div>
        </div>
        {sorted.map((dev, index) => (
          <div
            key={dev.id}
            className="grid grid-cols-5 gap-3 px-5 py-4 text-sm border-b border-slate-100 last:border-b-0"
          >
            <div className="font-semibold">#{index + 1}</div>
            <div className="col-span-2">
              <div className="font-semibold">{dev.name}</div>
              <div className="text-xs text-slate-500">Reputation {dev.reputation}</div>
            </div>
            <div>{dev.bounties}</div>
            <div className="font-semibold">${dev.earned.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
