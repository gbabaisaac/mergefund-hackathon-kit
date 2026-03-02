"use client";

import { useState } from "react";
import { mockLeaderboard } from "@/data/mock-leaderboard";

type SortKey = "earned" | "bounties" | "reputation";
type SortOrder = "asc" | "desc";

export default function LeaderboardPage() {
  const [sortKey, setSortKey] = useState<SortKey>("earned");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by search
  const filtered = mockLeaderboard.filter((dev) =>
    dev.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort with multiple keys for stable ordering
  const sorted = [...filtered].sort((a, b) => {
    // Primary sort
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    
    if (sortOrder === "desc") {
      if (bVal !== aVal) return bVal - aVal;
      // Secondary sort: earned
      if (b.earned !== a.earned) return b.earned - a.earned;
      // Tertiary sort: name
      return a.name.localeCompare(b.name);
    } else {
      if (aVal !== bVal) return aVal - bVal;
      if (a.earned !== b.earned) return a.earned - b.earned;
      return a.name.localeCompare(b.name);
    }
  });

  // Calculate rank with ties
  const getRank = (index: number): number => {
    if (index === 0) return 1;
    const current = sorted[index];
    const previous = sorted[index - 1];
    if (current[sortKey] === previous[sortKey]) {
      return getRank(index - 1); // Same rank as previous
    }
    return index + 1;
  };

  // Toggle sort
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  // Top 3 styling
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-l-4 border-l-yellow-400";
      case 2:
        return "bg-slate-50 border-l-4 border-l-slate-300";
      case 3:
        return "bg-orange-50 border-l-4 border-l-orange-300";
      default:
        return "";
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-2xl">🥇</span>;
      case 2:
        return <span className="text-2xl">🥈</span>;
      case 3:
        return <span className="text-2xl">🥉</span>;
      default:
        return <span className="font-bold text-slate-500">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-slate-600">
          Top bounty hunters ranked by earnings, completed bounties, and reputation.
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="🔍 Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSort("earned")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortKey === "earned"
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            💰 Earned {sortKey === "earned" && (sortOrder === "desc" ? "↓" : "↑")}
          </button>
          <button
            onClick={() => handleSort("bounties")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortKey === "bounties"
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            📋 Bounties {sortKey === "bounties" && (sortOrder === "desc" ? "↓" : "↑")}
          </button>
          <button
            onClick={() => handleSort("reputation")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortKey === "reputation"
                ? "bg-brand-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            ⭐ Reputation {sortKey === "reputation" && (sortOrder === "desc" ? "↓" : "↑")}
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-brand-600">
            ${filtered.reduce((sum, d) => sum + d.earned, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-500">Total Paid Out</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-brand-600">
            {filtered.reduce((sum, d) => sum + d.bounties, 0)}
          </div>
          <div className="text-sm text-slate-500">Bounties Completed</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl font-bold text-brand-600">
            {filtered.length}
          </div>
          <div className="text-sm text-slate-500">Active Hunters</div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5">Developer</div>
          <div className="col-span-2 text-right">Bounties</div>
          <div className="col-span-2 text-right">Reputation</div>
          <div className="col-span-2 text-right">Total Earned</div>
        </div>
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No developers found matching "{searchQuery}"
          </div>
        ) : (
          sorted.map((dev, index) => {
            const rank = getRank(index);
            return (
              <div
                key={dev.id}
                className={`grid grid-cols-12 gap-3 px-5 py-4 text-sm border-b border-slate-100 last:border-b-0 transition hover:bg-slate-50 ${getRankStyle(
                  rank
                )}`}
              >
                <div className="col-span-1 flex items-center">
                  {getRankBadge(rank)}
                </div>
                <div className="col-span-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                      {dev.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{dev.name}</div>
                      <div className="text-xs text-slate-500">
                        {dev.bounties} bounties completed
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-right">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                    {dev.bounties}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{dev.reputation}</span>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-right">
                  <span className="font-bold text-green-600 text-lg">
                    ${dev.earned.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-slate-400">
        Showing {sorted.length} of {mockLeaderboard.length} hunters • 
        Sorted by {sortKey} ({sortOrder === "desc" ? "highest first" : "lowest first"})
      </div>
    </div>
  );
}
