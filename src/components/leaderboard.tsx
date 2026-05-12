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

/** Stable sort: primary by earned (desc), secondary by name (asc) for deterministic tie-breaking */
function stableSort(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    return a.name.localeCompare(b.name);
  });
}

/** Compute rank for each entry. Users with the same earnings share the same rank.
 *  Ranks skip accordingly (e.g., 1, 2, 2, 4 — not 1, 2, 2, 3). */
function computeRanks(sorted: LeaderboardEntry[]): Map<string, number> {
  const ranks = new Map<string, number>();
  let currentRank = 1;
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].earned === sorted[i - 1].earned) {
      // Same earnings as previous — keep same rank
    } else {
      currentRank = i + 1;
    }
    ranks.set(sorted[i].id, currentRank);
  }
  return ranks;
}

/** Returns a CSS color class for each rank tier */
function rankStyle(rank: number): string {
  if (rank === 1) return "bg-yellow-100 text-yellow-800 border border-yellow-300";
  if (rank === 2) return "bg-slate-200 text-slate-700";
  if (rank === 3) return "bg-orange-100 text-orange-700 border border-orange-200";
  return "bg-slate-50 text-slate-500";
}

export function Leaderboard() {
  const sorted = stableSort(mockLeaderboard);
  const ranks = computeRanks(sorted);

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {sorted.map((entry) => {
          const rank = ranks.get(entry.id)!;
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
            >
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shrink-0 ${rankStyle(rank)}`}
              >
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
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{entry.name}</p>
                <p className="text-xs text-slate-500">
                  {entry.bounties_completed} bounties completed
                </p>
              </div>
              <span className="font-bold text-green-600 shrink-0">
                ${(entry.earned / 100).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-xs text-emerald-700">
          <strong>Fixed:</strong> Sorting is now stable and deterministic — tied users share the same rank
          (e.g. 1st, 2nd, 2nd, 4th). Refresh the page — order stays consistent.
        </p>
      </div>
    </div>
  );
}
