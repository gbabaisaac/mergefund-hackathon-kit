import { mockLeaderboard } from "@/data/mock-leaderboard";

export default function LeaderboardPage() {
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.bounties !== a.bounties) return b.bounties - a.bounties;
    return a.name.localeCompare(b.name);
  });

  const getRank = (index: number) => {
    if (index === 0) return 1;
    const current = sorted[index];
    const prev = sorted[index - 1];

    if (
      current.earned === prev.earned &&
      current.bounties === prev.bounties
    ) {
      return getRank(index - 1);
    }

    return index + 1;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Build a leaderboard UI with sorting and ranking logic.
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="hidden md:grid grid-cols-5 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">
          <div>Rank</div>
          <div className="col-span-2">Developer</div>
          <div>Bounties</div>
          <div>Total Earned</div>
        </div>

        <div className="md:hidden border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
          Top Developers
        </div>

        {sorted.map((dev, index) => (
          <div
            key={dev.id}
            className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-3 px-4 md:px-5 py-4 text-sm border-b border-slate-100 last:border-b-0"
          >
            <div className="font-semibold md:self-center">#{getRank(index)}</div>

            <div className="md:col-span-2">
              <div className="font-semibold break-words">{dev.name}</div>
              <div className="text-xs text-slate-500">Reputation {dev.reputation}</div>
            </div>

            <div className="text-slate-700">
              <span className="md:hidden text-xs text-slate-500 mr-2">Bounties:</span>
              {dev.bounties}
            </div>

            <div className="font-semibold">
              <span className="md:hidden text-xs text-slate-500 mr-2">Earned:</span>
              ${dev.earned.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
