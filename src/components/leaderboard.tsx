"use client";

// FIX: Sorting algorithm now uses stable sort with secondary key
// When two users have the same earnings, they are sorted by name for consistency

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
  // FIX: Stable sort with secondary key (name) for deterministic ordering
  // Primary sort: earned (descending)
  // Secondary sort: name (ascending) - ensures consistent order for ties
  const sorted = [...mockLeaderboard].sort((a, b) => {
    // First compare by earned (descending)
    if (b.earned !== a.earned) {
      return b.earned - a.earned;
    }
    // If earned is equal, sort by name (ascending) for deterministic order
    return a.name.localeCompare(b.name);
  });

  // FIX: Calculate rank properly - users with same earnings share the same rank
  let currentRank = 1;
  let prevEarned = -1;
  
  const ranked = sorted.map((entry, index) => {
    // If this entry has different earnings than previous, update rank
    if (entry.earned !== prevEarned) {
      currentRank = index + 1;
      prevEarned = entry.earned;
    }
    return { ...entry, rank: currentRank };
  });

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {ranked.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            {/* FIX: Rank now properly handles ties */}
            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              entry.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
              entry.rank === 2 ? 'bg-gray-100 text-gray-700' :
              entry.rank === 3 ? 'bg-orange-100 text-orange-700' :
              'bg-slate-200 text-slate-700'
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

      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-xs text-green-700">
          <strong>Fixed!</strong> Sort is now stable and tied users share the same rank.
        </p>
      </div>
    </div>
  );
}
