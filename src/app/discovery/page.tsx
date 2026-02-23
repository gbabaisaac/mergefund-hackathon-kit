"use client";

import { useState, useMemo } from "react";
import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

// RANKING ALGORITHM LOGIC:
// 1. Base Score = (Reward / 100) * 10
// 2. Difficulty Multiplier: Easy=1.0, Medium=1.5, Hard=2.0
// 3. Status Penalty: Open=1.0, In Progress=0.5, Completed=0
// 4. Final Score = Base * Multiplier * Status

export default function DiscoveryPage() {
  const [sortBy, setSortKey] = useState<"score" | "reward">("score");

  const rankedBounties = useMemo(() => {
    return mockBounties
      .map((bounty) => {
        const rewardValue = typeof bounty.reward === "string" 
          ? parseInt(bounty.reward.replace(/[^0-9]/g, "")) 
          : bounty.reward;
        
        let difficultyMultiplier = 1.0;
        if (bounty.difficulty === "Medium") difficultyMultiplier = 1.5;
        if (bounty.difficulty === "Hard") difficultyMultiplier = 2.0;

        let statusMultiplier = 1.0;
        if (bounty.status === "In Progress") statusMultiplier = 0.5;
        if (bounty.status === "Completed") statusMultiplier = 0;

        // Calculate score
        const score = (rewardValue / 100) * difficultyMultiplier * statusMultiplier;

        return { ...bounty, score: Math.round(score * 10) / 10 };
      })
      .sort((a, b) => {
        if (sortBy === "score") {
          return b.score - a.score || b.reward - a.reward;
        }
        return b.reward - a.reward;
      });
  }, [sortBy]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bounty Discovery</h1>
          <p className="text-slate-500">Smart ranking powered by our discovery algorithm</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSortKey("score")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortBy === "score" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Top Match
          </button>
          <button
            onClick={() => setSortKey("reward")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              sortBy === "reward" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Highest Reward
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rankedBounties.map((bounty) => (
          <div key={bounty.id} className="relative group">
            <div className="absolute -top-3 -right-3 z-10 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
              Score: {bounty.score}
            </div>
            <BountyCard {...bounty} />
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-900 rounded-3xl text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-blue-400">🤖</span> Algorithm Insight
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-300">
          <div className="space-y-2 border-l-2 border-blue-500/30 pl-4">
            <p className="font-bold text-white">Reward Weight</p>
            <p>Direct impact on base score. We prioritize high-value opportunities for hunters.</p>
          </div>
          <div className="space-y-2 border-l-2 border-purple-500/30 pl-4">
            <p className="font-bold text-white">Difficulty Bonus</p>
            <p>1.5x for Medium, 2.0x for Hard tasks. Complex work earns higher discovery ranking.</p>
          </div>
          <div className="space-y-2 border-l-2 border-green-500/30 pl-4">
            <p className="font-bold text-white">Availability Check</p>
            <p>Penalizes ongoing work and hides completed tasks to keep the marketplace fresh.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
