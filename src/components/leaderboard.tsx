"use client";

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  earned: number;
  bounties: number;
};

// Mock data with intentional ties in earnings
const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "alice_dev", avatar: "https://github.com/alice.png", earned: 5000, bounties: 10 },
  { id: "2", name: "bob_coder", avatar: "https://github.com/bob.png", earned: 3500, bounties: 7 },
  { id: "3", name: "charlie_eng", avatar: "https://github.com/charlie.png", earned: 3500, bounties: 8 },
  { id: "4", name: "diana_dev", avatar: "https://github.com/diana.png", earned: 2000, bounties: 4 },
  { id: "5", name: "eve_hacker", avatar: "https://github.com/eve.png", earned: 2000, bounties: 5 },
  { id: "6", name: "frank_dev", avatar: "https://github.com/frank.png", earned: 2000, bounties: 3 },
];

export function Leaderboard() {
  // Stable sort: primary key is earnings (desc), secondary key is id (asc) for deterministic ordering
  const sorted = [...mockLeaderboard].sort((a, b) => {
    if (b.earned !== a.earned) return b.earned - a.earned;
    return a.id.localeCompare(b.id);
  });

  // Compute ranks with tie handling: same earnings = same rank, next rank skips accordingly
  // e.g., rank 1, rank 1, rank 3 (not rank 1, rank 1, rank 2)
  let currentRank = 0;
  let prevEarned: number | null = null;
  const ranked = sorted.map((entry) => {
    if (entry.earned !== prevEarned) {
      currentRank++;
    }
    const rank = currentRank;
    prevEarned = entry.earned;
    return { entry, rank };
  });

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Top Earners</h3>
      <div className="space-y-3">
        {ranked.map(({ entry, rank }) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-sm font-bold">
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
                {entry.bounties} bounties completed
              </p>
            </div>
            <span className="font-bold text-green-600">
              ${(entry.earned / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-xs text-emerald-700">
          <strong>Fixed:</strong> Tied earners now share the same rank and appear in a deterministic order.
        </p>
      </div>
    </div>
  );
}
