"use client";

import { useState } from "react";

const mockContributors = [
  { id: "1", name: "Ava Jordan", avatar: "https://github.com/ava.png", contributions: 47, streak: 12, specialty: "Smart Contracts" },
  { id: "2", name: "Leo Santos", avatar: "https://github.com/leo.png", contributions: 38, streak: 8, specialty: "Frontend" },
  { id: "3", name: "Mina Park", avatar: "https://github.com/mina.png", contributions: 35, streak: 15, specialty: "Backend" },
  { id: "4", name: "Ravi Singh", avatar: "https://github.com/ravi.png", contributions: 29, streak: 5, specialty: "DevOps" },
  { id: "5", name: "Zoe Chen", avatar: "https://github.com/zoe.png", contributions: 24, streak: 20, specialty: "UI/UX" },
  { id: "6", name: "Kai Johnson", avatar: "https://github.com/kai.png", contributions: 21, streak: 3, specialty: "Testing" },
  { id: "7", name: "Nina Patel", avatar: "https://github.com/nina.png", contributions: 18, streak: 7, specialty: "Documentation" },
  { id: "8", name: "Tom Wilson", avatar: "https://github.com/tom.png", contributions: 15, streak: 2, specialty: "Security" },
];

const timeFilters = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "All Time", value: "all" },
];

export default function TopContributorsPage() {
  const [timeFilter, setTimeFilter] = useState("week");
  const [sortBy, setSortBy] = useState<"contributions" | "streak">("contributions");

  const sorted = [...mockContributors].sort((a, b) => {
    if (sortBy === "contributions") return b.contributions - a.contributions;
    return b.streak - a.streak;
  });

  const topContributor = sorted[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Top Contributors of the Week</h1>
        <p className="text-slate-600">
          Celebrating the most active and dedicated developers in our community.
        </p>
      </div>

      {/* Featured Top Contributor */}
      {topContributor && (
        <div className="card bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-3xl shadow-lg">
                👑
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm border-2 border-white">
                ⭐
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-purple-900">{topContributor.name}</h2>
              <p className="text-sm text-purple-700">{topContributor.specialty}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                  {topContributor.contributions} contributions
                </span>
                <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                  🔥 {topContributor.streak} day streak
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTimeFilter(filter.value)}
              className={`px-3 py-1.5 text-sm rounded-lg transition ${
                timeFilter === filter.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-slate-600">Sort by:</span>
          <button
            onClick={() => setSortBy("contributions")}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${
              sortBy === "contributions"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Contributions
          </button>
          <button
            onClick={() => setSortBy("streak")}
            className={`px-3 py-1.5 text-sm rounded-lg transition ${
              sortBy === "streak"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Streak
          </button>
        </div>
      </div>

      {/* Contributors Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {sorted.map((contributor, index) => (
          <div
            key={contributor.id}
            className="card p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              {/* Rank Badge */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                index === 0 ? "bg-gradient-to-br from-yellow-400 to-orange-500" :
                index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-400" :
                index === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700" :
                "bg-slate-200 text-slate-600"
              }`}>
                {index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {contributor.name.split(" ").map(n => n[0]).join("")}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{contributor.name}</h3>
                <p className="text-xs text-slate-500">{contributor.specialty}</p>
              </div>

              {/* Stats */}
              <div className="text-right">
                <p className="font-semibold text-green-600">{contributor.contributions}</p>
                <p className="text-xs text-slate-500">contributions</p>
              </div>

              {/* Streak */}
              <div className="text-right">
                <p className="font-semibold text-orange-500">🔥 {contributor.streak}</p>
                <p className="text-xs text-slate-500">days</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Total Contributors</p>
          <p className="text-2xl font-bold">{sorted.length}</p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Total Contributions</p>
          <p className="text-2xl font-bold text-green-600">
            {sorted.reduce((sum, c) => sum + c.contributions, 0)}
          </p>
        </div>
        <div className="card p-4 text-center">
          <p className="text-xs text-slate-500">Best Streak</p>
          <p className="text-2xl font-bold text-orange-500">
            🔥 {Math.max(...sorted.map(c => c.streak))} days
          </p>
        </div>
      </div>
    </div>
  );
}
