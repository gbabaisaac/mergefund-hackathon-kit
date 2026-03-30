"use client";

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

export function Leaderboard() {
  // FIX: Stable sort using secondary key (name) for deterministic ordering when earnings tie.
  // Uses Array.toSorted (stable in modern JS) with bounties_completed as tiebreaker,
  // then name as final tiebreaker for full determinism.
  const sorted = [...mockLeaderboard].toSorted((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    if (b.bounties_completed !== a.bounties_completed) return b.bounties_completed - a.bounties_completed;
    return a.name.localeCompare(b.name); // deterministic final tiebreaker
  });

  // FIX: Compute rank with proper tie handling — users with the same earnings share the same rank.
  // Rank is based on position in the sorted list, but tied users get the same rank.
  // Next rank is skipped appropriately (e.g., 1, 2, 2, 4).
  let prevEarned: number | null = null;
  let prevRank = 0;
  const getRank = (index: number, earned: number): number => {
    if (earned !== prevEarned) {
      prevRank = index + 1;
      prevEarned = earned;
    }
    return prevRank;
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry, index) => {
          const rank = getRank(index, entry.earned);
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                ${rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" :
                  rank === 2 ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300" :
                  rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300" :
                  "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"}`}>
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
                <p className="font-medium dark:text-slate-100">{entry.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {entry.bounties_completed} bounties completed
                </p>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400">
                ${(entry.earned / 100).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-900/30 dark:border-emerald-800">
        <p className="text-xs text-emerald-700 dark:text-emerald-300">
          <strong>Fixed:</strong> Sorting is now stable — tied users share the same rank and appear in consistent order on every refresh.
        </p>
      </div>
    </div>
  );
}
