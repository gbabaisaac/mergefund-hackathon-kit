"use client";

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  earned: number;
  bounties_completed: number;
};

// Mock data with ties in earnings
const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "alice_dev", avatar: "https://github.com/alice.png", earned: 5000, bounties_completed: 10 },
  { id: "2", name: "bob_coder", avatar: "https://github.com/bob.png", earned: 3500, bounties_completed: 7 },
  { id: "3", name: "charlie_eng", avatar: "https://github.com/charlie.png", earned: 3500, bounties_completed: 8 },
  { id: "4", name: "diana_dev", avatar: "https://github.com/diana.png", earned: 2000, bounties_completed: 4 },
  { id: "5", name: "eve_hacker", avatar: "https://github.com/eve.png", earned: 2000, bounties_completed: 5 },
  { id: "6", name: "frank_dev", avatar: "https://github.com/frank.png", earned: 2000, bounties_completed: 3 },
];

export function Leaderboard() {
  // Sort by earned (descending), then by bounties_completed (descending) as tiebreaker
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) {
      return b.earned - a.earned;
    }
    return b.bounties_completed - a.bounties_completed;
  });

  // Calculate ranks handling ties properly
  let currentRank = 0;
  let previousEarned = -1;
  const rankedEntries = sorted.map((entry) => {
    if (entry.earned !== previousEarned) {
      currentRank = sorted.indexOf(entry) + 1;
      previousEarned = entry.earned;
    }
    return { ...entry, rank: currentRank };
  });

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {rankedEntries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
              entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
              entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
              'bg-slate-200'
            }`}>
              {entry.rank}
            </span>
            <img
              src={entry.avatar}
              alt={entry.name}
              className="w-10 h-10 rounded-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${entry.name}`;
              }}
            />
            <div className="flex-1">
              <p className="font-medium">{entry.name}</p>
              <p className="text-xs text-slate-500">
                {entry.bounties_completed} bounties completed
              </p>
            </div>
            <span className="font-bold text-green-600">
              ${(entry.earned / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
