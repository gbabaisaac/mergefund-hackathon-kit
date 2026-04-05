"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type FilterProps = {
  onFilterChange: (filters: { difficulty: string; minReward: number }) => void;
};

export function BountyFilter({ onFilterChange }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL query params so filters survive page refresh
  const [difficulty, setDifficulty] = useState(() => {
    return searchParams.get("difficulty") ?? "all";
  });
  const [minReward, setMinReward] = useState(() => {
    const raw = searchParams.get("minReward");
    return raw ? Number(raw) : 0;
  });

  // Track whether we've done the initial URL-based sync
  const initialSyncDone = useRef(false);

  useEffect(() => {
    if (!initialSyncDone.current) {
      // On mount, sync URL params to parent state so filtered results match
      onFilterChange({ difficulty, minReward });
      initialSyncDone.current = true;
    }
  }, [difficulty, minReward, onFilterChange]);

  // Persist filter changes to URL query params so they survive page refresh
  useEffect(() => {
    if (!initialSyncDone.current) return; // skip until initial sync is done
    const params = new URLSearchParams();
    if (difficulty !== "all") params.set("difficulty", difficulty);
    if (minReward > 0) params.set("minReward", String(minReward));
    const query = params.toString();
    router.replace(query ? `?${query}` : "/bugs/filter", { scroll: false });
  }, [difficulty, minReward, router]);

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    onFilterChange({ difficulty: value, minReward });
  };

  const handleMinRewardChange = (value: number) => {
    setMinReward(value);
    onFilterChange({ difficulty, minReward: value });
  };

  return (
    <div className="card p-4 flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
        >
          <option value="all">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-600">Min Reward:</label>
        <input
          type="number"
          value={minReward}
          onChange={(e) => handleMinRewardChange(Number(e.target.value))}
          className="w-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
          placeholder="0"
        />
      </div>

      <div className="text-xs text-emerald-600">
        Filters are now persisted in the URL — refresh the page and they stay!
      </div>
    </div>
  );
}
