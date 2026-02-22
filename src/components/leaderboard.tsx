"use client";

// BUG: Sorting algorithm doesn't handle ties correctly
// When two users have the same earnings, their relative order is inconsistent
// FIX: Add secondary sort key (e.g., by name or join date)

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
  // BUG: This sort is unstable - tied entries will have inconsistent ordering
  // The sort only compares by earned, but when earned values are equal,
  // the result depends on the browser's sort implementation (which may vary)
  const sorted = [...mockLeaderboard].sort((a, b) => b.earned - a.earned);

  // BUG: Rank calculation doesn't account for ties properly
  // Users with the same earnings should have the same rank
  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            {/* BUG: Rank is just index+1, doesn't handle ties */}
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-sm font-bold">
              {index + 1}
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

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-700">
          <strong>Bug hint:</strong> Notice how users with $35.00 and $20.00 might appear in different orders on page refresh.
          Also, shouldn&apos;t tied users have the same rank?
        </p>
      </div>
    </div>
  );
}
