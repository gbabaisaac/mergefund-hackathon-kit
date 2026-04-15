"use client";

// FIX: Sorting algorithm now handles ties correctly with deterministic ordering
// - Stable sort with secondary key (name) ensures consistent ordering when earnings are equal
// - Rank calculation properly handles ties: users with the same earnings get the same rank

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  earned: number;
  bounties_completed: number;
};

// Mock data with intentional ties in earnings
const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "alice_dev", avatar: "https://github.com/alice.png", earned: 5000, bounties_completed: 10 },
  { id: "2", name: "bob_coder", avatar: "https://github.com/bob.png", earned: 3500, bounties_completed: 7 },
  { id: "3", name: "charlie_eng", avatar: "https://github.com/charlie.png", earned: 3500, bounties_completed: 8 }, // TIE with bob
  { id: "4", name: "diana_dev", avatar: "https://github.com/diana.png", earned: 2000, bounties_completed: 4 },
  { id: "5", name: "eve_hacker", avatar: "https://github.com/eve.png", earned: 2000, bounties_completed: 5 }, // TIE with diana
  { id: "6", name: "frank_dev", avatar: "https://github.com/frank.png", earned: 2000, bounties_completed: 3 }, // TIE with diana and eve
];

export function Leaderboard() {
  // FIX: Stable sort with secondary key (name) for deterministic ordering when earnings are equal
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    return a.name.localeCompare(b.name); // secondary key: alphabetical by name
  });

  // FIX: Compute rank properly, skipping ranks for ties
  // Build an array of unique earned values in descending order
  const uniqueEarnings = [...new Set(mockLeaderboard.map(e => e.earned))].sort((a, b) => b - a);
  const rankOf = (earned: number) => uniqueEarnings.indexOf(earned) + 1;

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-100 text-amber-700';
    if (rank === 2) return 'bg-slate-200 text-slate-600';
    if (rank === 3) return 'bg-orange-100 text-orange-700';
    return 'bg-slate-200 text-slate-600';
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry) => {
          const rank = rankOf(entry.earned);
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${getRankStyle(rank)}`}>
                {rank}
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
          );
        })}
      </div>
    </div>
  );
}
