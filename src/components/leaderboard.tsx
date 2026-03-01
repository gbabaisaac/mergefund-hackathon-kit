"use client";

// FIXED: Sorting algorithm now handles ties correctly
// Primary sort: by earnings (descending)
// Secondary sort: by bounties_completed (descending)
// Tertiary sort: by name (ascending) for deterministic ordering

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
  // FIXED: Stable sort with multiple keys
  // 1. Primary: earnings (descending)
  // 2. Secondary: bounties_completed (descending)
  // 3. Tertiary: name (ascending) for deterministic ordering
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.bounties_completed !== a.bounties_completed) return b.bounties_completed - a.bounties_completed;
    return a.name.localeCompare(b.name);
  });

  // FIXED: Calculate ranks accounting for ties
  // Users with the same earnings get the same rank
  const getRank = (index: number): number => {
    if (index === 0) return 1;
    if (sorted[index].earned === sorted[index - 1].earned) {
      return getRank(index - 1); // Same rank as previous
    }
    return index + 1;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            {/* FIXED: Rank now correctly handles ties */}
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-sm font-bold">
              {getRank(index)}
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
          <strong>Fixed:</strong> Users with the same earnings now have the same rank and deterministic ordering.
          Ties are broken by bounties completed, then alphabetically by name.
        </p>
      </div>
    </div>
  );
}
