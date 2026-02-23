"use client";

import { useState, useMemo } from "react";

// BUG: Sorting algorithm doesn't handle ties correctly
// FIX: Implement stable sorting with secondary (reputation) and tertiary (name) keys

type LeaderboardEntry = {
  id: string;
  name: string;
  avatar: string;
  earned: number;
  bounties_completed: number;
  reputation: number;
};

const mockLeaderboard: LeaderboardEntry[] = [
  { id: "1", name: "alice_dev", avatar: "https://github.com/alice.png", earned: 5000, bounties_completed: 10, reputation: 95 },
  { id: "2", name: "bob_coder", avatar: "https://github.com/bob.png", earned: 3500, bounties_completed: 7, reputation: 80 },
  { id: "3", name: "charlie_eng", avatar: "https://github.com/charlie.png", earned: 3500, bounties_completed: 8, reputation: 85 },
  { id: "4", name: "diana_dev", avatar: "https://github.com/diana.png", earned: 2000, bounties_completed: 4, reputation: 70 },
  { id: "5", name: "eve_hacker", avatar: "https://github.com/eve.png", earned: 2000, bounties_completed: 5, reputation: 70 },
  { id: "6", name: "frank_dev", avatar: "https://github.com/frank.png", earned: 2000, bounties_completed: 3, reputation: 60 },
];

export function Leaderboard() {
  const [sortKey, setSortKey] = useState<"earned" | "reputation">("earned");

  const sortedData = useMemo(() => {
    return [...mockLeaderboard].sort((a, b) => {
      // Primary sort
      if (b[sortKey] !== a[sortKey]) {
        return b[sortKey] - a[sortKey];
      }
      // Secondary sort (tie-breaker): if sorting by earned, use reputation. if by reputation, use earned.
      const secondaryKey = sortKey === "earned" ? "reputation" : "earned";
      if (b[secondaryKey] !== a[secondaryKey]) {
        return b[secondaryKey] - a[secondaryKey];
      }
      // Tertiary sort: alphabetically by name for deterministic order
      return a.name.localeCompare(b.name);
    });
  }, [sortKey]);

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Leaderboard</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setSortKey("earned")}
            className={`px-3 py-1 text-xs rounded-full transition ${sortKey === "earned" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Top Earners
          </button>
          <button 
            onClick={() => setSortKey("reputation")}
            className={`px-3 py-1 text-xs rounded-full transition ${sortKey === "reputation" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            Top Reputation
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {sortedData.map((entry, index) => {
          const rank = index + 1;
          return (
            <div
              key={entry.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
                {rank}
              </span>
              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-10 h-10 rounded-full border border-slate-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${entry.name}&background=random`;
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 truncate">{entry.name}</p>
                <p className="text-xs text-slate-500">
                  {entry.bounties_completed} bounties • {entry.reputation} rep
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">
                  ${(entry.earned / 100).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-3 items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Stable Sorting Active:</strong> Deterministic ordering ensured via secondary tie-breakers (Reputation & Alphabetical).
          </p>
        </div>
      </div>
    </div>
  );
}
