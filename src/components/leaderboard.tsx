"use client";

// FIXED: Sorting algorithm now handles ties correctly
// - Stable sort with secondary key (bounties_completed descending, then name ascending)
// - Rank calculation accounts for ties (users with same earned get same rank)

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
  // FIX: Stable sort with secondary key
  // Primary: earned descending
  // Secondary: bounties_completed descending
  // Tertiary: name ascending (alphabetical for determinism)
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.bounties_completed !== a.bounties_completed) return b.bounties_completed - a.bounties_completed;
    return a.name.localeCompare(b.name);
  });

  // FIX: Calculate ranks accounting for ties
  // Users with same earned get the same rank
  const ranks: number[] = [];
  let currentRank = 1;
  sorted.forEach((entry, index) => {
    if (index === 0) {
      ranks.push(1);
    } else if (entry.earned === sorted[index - 1].earned) {
      // Same earned = same rank
      ranks.push(ranks[index - 1]);
    } else {
      // Different earned = rank is position + 1
      currentRank = index + 1;
      ranks.push(currentRank);
    }
  });

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            {/* FIX: Rank accounts for ties - same earned = same rank */}
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-sm font-bold">
              {ranks[index]}
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
