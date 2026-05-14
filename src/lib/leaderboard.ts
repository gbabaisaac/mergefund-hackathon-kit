export type LeaderboardRankable = {
  id: string;
  name: string;
  earned: number;
};

export type RankedLeaderboardEntry<T extends LeaderboardRankable> = T & {
  rank: number;
};

export function sortLeaderboardEntries<T extends LeaderboardRankable>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const earnedDiff = b.earned - a.earned;
    if (earnedDiff !== 0) return earnedDiff;

    const nameDiff = a.name.localeCompare(b.name, undefined, {
      sensitivity: "base",
      numeric: true,
    });
    if (nameDiff !== 0) return nameDiff;

    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });
}

export function rankLeaderboardEntries<T extends LeaderboardRankable>(
  entries: T[],
): RankedLeaderboardEntry<T>[] {
  const sorted = sortLeaderboardEntries(entries);
  let currentRank = 1;

  return sorted.map((entry, index) => {
    const previous = index > 0 ? sorted[index - 1] : undefined;
    if (previous && entry.earned !== previous.earned) {
      currentRank = index + 1;
    }

    return {
      ...entry,
      rank: currentRank,
    };
  });
}
