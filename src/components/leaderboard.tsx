"use client";

/**
 * Leaderboard (Issue #8). Cause: (1) Sort used only earned, so when values matched
 * the comparator returned 0 and order was non-deterministic. (2) Rank was index+1
 * so tied users got different ranks. Fix: (1) Stable sort with secondary keys:
 * by earned desc, then bounties_completed desc, then name. (2) Compute rank so
 * identical earned get same rank (rank = index + 1 when earned differs from previous).
 */
type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  earned: number;
  bounties_completed: number;
};

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "alice_dev", avatar: "https://github.com/alice.png", earned: 5000, bounties_completed: 10 },
  { id: "2", name: "bob_coder", avatar: "https://github.com/bob.png", earned: 3500, bounties_completed: 7 },
  { id: "3", name: "charlie_eng", avatar: "https://github.com/charlie.png", earned: 3500, bounties_completed: 8 },
  { id: "4", name: "diana_dev", avatar: "https://github.com/diana.png", earned: 2000, bounties_completed: 4 },
  { id: "5", name: "eve_hacker", avatar: "https://github.com/eve.png", earned: 2000, bounties_completed: 5 },
  { id: "6", name: "frank_dev", avatar: "https://github.com/frank.png", earned: 2000, bounties_completed: 3 },
];

function compareEntries(a: LeaderboardEntry, b: LeaderboardEntry): number {
  const byEarned = b.earned - a.earned;
  if (byEarned !== 0) return byEarned;
  const byBounties = b.bounties_completed - a.bounties_completed;
  if (byBounties !== 0) return byBounties;
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

export function Leaderboard() {
  const sorted = [...mockLeaderboard].sort(compareEntries);

  const ranks: number[] = [];
  let prevEarned: number | null = null;
  let rank = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i].earned !== prevEarned) {
      rank = i + 1;
      prevEarned = sorted[i].earned;
    }
    ranks[i] = rank;
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
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

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-700">
          <strong>Fixed:</strong> Stable sort (earned → bounties_completed → name); tied users share the same rank.
        </p>
      </div>
    </div>
  );
}
