&quot;use client&quot;;

import { useState, useMemo } from &quot;react&quot;;

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  earned: number;
  bounties_completed: number;
};

// Mock data with intentional ties in earnings
const mockLeaderboard: LeaderboardEntry[] = [
  { id: &quot;1&quot;, name: &quot;alice_dev&quot;, avatar: &quot;https://github.com/alice.png&quot;, earned: 5000, bounties_completed: 10 },
  { id: &quot;2&quot;, name: &quot;bob_coder&quot;, avatar: &quot;https://github.com/bob.png&quot;, earned: 3500, bounties_completed: 7 },
  { id: &quot;3&quot;, name: &quot;charlie_eng&quot;, avatar: &quot;https://github.com/charlie.png&quot;, earned: 3500, bounties_completed: 8 },
  { id: &quot;4&quot;, name: &quot;diana_dev&quot;, avatar: &quot;https://github.com/diana.png&quot;, earned: 2000, bounties_completed: 4 },
  { id: &quot;5&quot;, name: &quot;eve_hacker&quot;, avatar: &quot;https://github.com/eve.png&quot;, earned: 2000, bounties_completed: 5 },
  { id: &quot;6&quot;, name: &quot;frank_dev&quot;, avatar: &quot;https://github.com/frank.png&quot;, earned: 2000, bounties_completed: 3 },
];

/** Stable sort: primary by earned descending, secondary by name ascending. */
function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    const earnedDiff = b.earned - a.earned;
    if (earnedDiff !== 0) return earnedDiff;
    // Secondary sort by name (alphabetical) guarantees deterministic order
    return a.name.localeCompare(b.name);
  });
}

/**
 * Compute competition ("Olympic") ranks:
 * Tied entries share the same rank, and the next distinct score
 * jumps to position + 1.
 *
 * Example: scores [100, 100, 90] → ranks [1, 1, 3]
 */
function computeRanks(sorted: LeaderboardEntry[]): number[] {
  const ranks: number[] = [];
  let currentRank = 1;

  for (let i = 0; i < sorted.length; i++) {
    if (i === 0) {
      ranks.push(currentRank);
    } else if (sorted[i].earned === sorted[i - 1].earned) {
      ranks.push(currentRank);
    } else {
      currentRank = i + 1;
      ranks.push(currentRank);
    }
  }

  return ranks;
}

export function Leaderboard() {
  const [sortKey, setSortKey] = useState<&quot;earned&quot; | &quot;bounties&quot;>(&quot;earned&quot;);

  // Memo: stable sort with tie-breaking
  const sorted = useMemo(() => {
    const entries = [...mockLeaderboard];
    entries.sort((a, b) => {
      const primary = sortKey === &quot;earned&quot;
        ? b.earned - a.earned
        : b.bounties_completed - a.bounties_completed;
      if (primary !== 0) return primary;
      // Secondary: by name ensures deterministic order
      return a.name.localeCompare(b.name);
    });
    return entries;
  }, [sortKey]);

  // Olympic ranks (ties share same rank)
  const ranks = useMemo(() => computeRanks(sorted), [sorted]);

  return (
    <div className="card p-6">
      {/* Header with sort toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Top Earners</h3>
        <div className="flex gap-1.5">
          <button
            onClick={() => setSortKey(&quot;earned&quot;)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
              sortKey === &quot;earned&quot;
                ? &quot;bg-brand-600 text-white&quot;
                : &quot;bg-slate-100 text-slate-600 hover:bg-slate-200&quot;
            }`}
          >
            By Earnings
          </button>
          <button
            onClick={() => setSortKey(&quot;bounties&quot;)}
            className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
              sortKey === &quot;bounties&quot;
                ? &quot;bg-brand-600 text-white&quot;
                : &quot;bg-slate-100 text-slate-600 hover:bg-slate-200&quot;
            }`}
          >
            By Bounties
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="space-y-3">
        {sorted.map((entry, index) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
          >
            {/* Competition rank — ties share same number */}
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                ranks[index] <= 3
                  ? &quot;bg-amber-100 text-amber-700&quot;
                  : &quot;bg-slate-200 text-slate-600&quot;
              }`}
              title={ranks[index] <= 3 &amp;&amp; index &gt; 0 &amp;&amp; sorted[index].earned === sorted[index - 1].earned
                ? `Tied for position ${ranks[index]}`
                : undefined}
            >
              {ranks[index]}
              {ranks[index] <= 3 &amp;&amp; index &gt; 0 &amp;&amp; sorted[index].earned === sorted[index - 1].earned &amp;&amp; (
                <sup className="text-[8px] -top-0.5 ml-px">T</sup>
              )}
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
                {entry.bounties_completed} bounties &middot; {entry.earned / 100 > 0 ? `$${(entry.earned / 100).toFixed(2)} earned` : ""}
              </p>
            </div>

            <span className="font-bold text-green-600 shrink-0">
              ${(entry.earned / 100).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Reputation column (new) */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-slate-600 mb-2">Reputation Score</h4>
        {sorted.map((entry) => {
          const rep = entry.bounties_completed * 10 + Math.floor(entry.earned / 100);
          return (
            <div key={entry.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
              <span className="text-slate-600 truncate mr-2">{entry.name}</span>
              <span className="font-mono font-semibold text-slate-700">{rep}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
