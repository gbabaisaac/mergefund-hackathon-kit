import { mockLeaderboard } from "@/data/mock-leaderboard";

type LeaderboardEntry = {
  id: string;
  name: string;
  bounties: number;
  earned: number;
  reputation: number;
  rank?: number;
};

export default function LeaderboardPage() {
  // Enhanced sorting: primary by earned, secondary by reputation, tertiary by name
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.reputation !== a.reputation) return b.reputation - a.reputation;
    return a.name.localeCompare(b.name);
  }) as LeaderboardEntry[];

  // Calculate ranks with tie handling
  const withRanks = sorted.map((dev, index) => {
    if (index === 0) return { ...dev, rank: 1 };
    const prev = sorted[index - 1];
    if (dev.earned === prev.earned && dev.reputation === prev.reputation) {
      return { ...dev, rank: prev.rank };
    }
    return { ...dev, rank: index + 1 };
  });

  // Get top 3 for podium display
  const top3 = withRanks.slice(0, 3);
  const rest = withRanks.slice(3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Top developers ranked by total earnings, reputation, and activity.
        </p>
      </div>

      {/* Podium - Top 3 */}
      <div className="grid grid-cols-3 gap-4 items-end">
        {/* 2nd Place */}
        {top3[1] && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              🥈
            </div>
            <p className="mt-2 font-semibold text-sm">{top3[1].name}</p>
            <p className="text-xs text-slate-500">${top3[1].earned.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Rep: {top3[1].reputation}</p>
          </div>
        )}
        
        {/* 1st Place */}
        {top3[0] && (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
              🥇
            </div>
            <p className="mt-2 font-bold">{top3[0].name}</p>
            <p className="text-sm text-slate-500">${top3[0].earned.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Rep: {top3[0].reputation}</p>
          </div>
        )}
        
        {/* 3rd Place */}
        {top3[2] && (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
              🥉
            </div>
            <p className="mt-2 font-semibold text-sm">{top3[2].name}</p>
            <p className="text-xs text-slate-500">${top3[2].earned.toLocaleString()}</p>
            <p className="text-xs text-slate-400">Rep: {top3[2].reputation}</p>
          </div>
        )}
      </div>

      {/* Full Leaderboard Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="px-5 py-3 text-left">Rank</th>
                <th className="px-5 py-3 text-left">Developer</th>
                <th className="px-5 py-3 text-center">Bounties</th>
                <th className="px-5 py-3 text-right">Total Earned</th>
                <th className="px-5 py-3 text-right">Reputation</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((dev) => (
                <tr
                  key={dev.id}
                  className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4">
                    <span className="font-semibold text-slate-700">#{dev.rank}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium">{dev.name}</div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-block px-2 py-1 bg-slate-100 rounded text-xs">
                      {dev.bounties}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="font-semibold text-green-600">${dev.earned.toLocaleString()}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      dev.reputation >= 90 ? 'bg-green-100 text-green-700' :
                      dev.reputation >= 80 ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {dev.reputation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Total Developers</p>
          <p className="text-2xl font-bold">{withRanks.length}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Total Bounties</p>
          <p className="text-2xl font-bold">{withRanks.reduce((sum, d) => sum + d.bounties, 0)}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Total Earned</p>
          <p className="text-2xl font-bold text-green-600">${withRanks.reduce((sum, d) => sum + d.earned, 0).toLocaleString()}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Avg Reputation</p>
          <p className="text-2xl font-bold">{Math.round(withRanks.reduce((sum, d) => sum + d.reputation, 0) / withRanks.length)}</p>
        </div>
      </div>
    </div>
  );
}
