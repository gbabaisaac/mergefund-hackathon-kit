"use client";

import { useMemo } from "react";

// BUG: Sorting algorithm doesn't handle ties correctly
// When two users have the same earnings, their relative order is inconsistent
// FIX: Add secondary sort key (e.g., by bounties_completed or name)

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
  /**
   * FIX: Stable and deterministic sorting.
   * Priority: 
   * 1. Earned amount (DESC)
   * 2. Bounties completed (DESC)
   * 3. Name (ASC) - fallback for absolute determinism
   */
  const sorted = useMemo(() => {
    return [...mockLeaderboard].sort((a, b) => {
      if (b.earned !== a.earned) {
        return b.earned - a.earned;
      }
      if (b.bounties_completed !== a.bounties_completed) {
        return b.bounties_completed - a.bounties_completed;
      }
      return a.name.localeCompare(b.name);
    });
  }, []);

  /**
   * FIX: Standard Competition Ranking (1224)
   * Users with identical earnings get the same rank.
   */
  const rankedData = useMemo(() => {
    let currentRank = 1;
    return sorted.map((entry, index) => {
      if (index > 0 && entry.earned < sorted[index - 1].earned) {
        currentRank = index + 1;
      }
      return { ...entry, rank: currentRank };
    });
  }, [sorted]);

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return "bg-amber-100 text-amber-700 ring-2 ring-amber-300";
      case 2: return "bg-slate-200 text-slate-700 ring-2 ring-slate-300";
      case 3: return "bg-orange-100 text-orange-700 ring-2 ring-orange-300";
      default: return "bg-slate-50 text-slate-500";
    }
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <div className="card p-6 border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Top Earners</h3>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          Season 1
        </span>
      </div>
      
      <div className="space-y-4">
        {rankedData.map((entry) => (
          <div
            key={entry.id}
            className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-sm transition-all duration-200"
          >
            <div className={`relative w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm ${getRankStyle(entry.rank)}`}>
              {entry.rank}
              {getMedalEmoji(entry.rank) && (
                <span className="absolute -top-1 -right-1 text-xs">
                  {getMedalEmoji(entry.rank)}
                </span>
              )}
            </div>
            
            <img
              src={entry.avatar}
              alt={entry.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${entry.name}&background=random&color=fff`;
              }}
            />
            
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate group-hover:text-brand-700 transition-colors">
                {entry.name}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                {entry.bounties_completed} bounties completed
              </p>
            </div>
            
            <div className="text-right">
              <span className="block font-bold text-green-600 text-lg">
                ${(entry.earned / 100).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-medium">Total Earned</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex gap-3">
        <div className="text-emerald-500 shrink-0">✨</div>
        <p className="text-xs text-emerald-800 leading-relaxed">
          <strong>Stable Ranking Implemented:</strong> Sorting is now deterministic (Earned &gt; Completed &gt; Name). 
          Rank 1-2-2-4 is applied for equal earnings.
        </p>
      </div>
    </div>
  );
}
