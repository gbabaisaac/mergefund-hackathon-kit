import { describe, it, expect } from "vitest";
import { getRankedLeaderboard, LeaderboardEntry, mockLeaderboard } from "../src/leaderboard";

describe("Leaderboard Sorting & Ranking Logic", () => {
  it("should sort primarily by earnings descending", () => {
    const entries: LeaderboardEntry[] = [
      { id: "1", name: "low", avatar: "", earned: 1000, bounties_completed: 1 },
      { id: "2", name: "high", avatar: "", earned: 9000, bounties_completed: 1 },
      { id: "3", name: "mid", avatar: "", earned: 5000, bounties_completed: 1 },
    ];

    const result = getRankedLeaderboard(entries);
    expect(result.map((r) => r.name)).toEqual(["high", "mid", "low"]);
    expect(result.map((r) => r.rank)).toEqual([1, 2, 3]);
  });

  it("should deterministically break ties by bounties_completed descending", () => {
    const entries: LeaderboardEntry[] = [
      { id: "1", name: "bob", avatar: "", earned: 3500, bounties_completed: 5 },
      { id: "2", name: "charlie", avatar: "", earned: 3500, bounties_completed: 8 },
    ];

    const result = getRankedLeaderboard(entries);
    expect(result[0].name).toBe("charlie");
    expect(result[1].name).toBe("bob");
    // Both share rank 1 because earnings are tied
    expect(result[0].rank).toBe(1);
    expect(result[1].rank).toBe(1);
  });

  it("should deterministically break secondary ties by username alphabetically", () => {
    const entries: LeaderboardEntry[] = [
      { id: "1", name: "zack", avatar: "", earned: 2000, bounties_completed: 4 },
      { id: "2", name: "adam", avatar: "", earned: 2000, bounties_completed: 4 },
    ];

    const result = getRankedLeaderboard(entries);
    expect(result[0].name).toBe("adam");
    expect(result[1].name).toBe("zack");
  });

  it("should assign standard competition ranking (1, 2, 2, 4...) for tied earnings", () => {
    const result = getRankedLeaderboard(mockLeaderboard);

    // alice: 5000 -> rank 1
    expect(result[0].name).toBe("alice_dev");
    expect(result[0].rank).toBe(1);

    // charlie: 3500 (8 bounties) -> rank 2
    expect(result[1].name).toBe("charlie_eng");
    expect(result[1].rank).toBe(2);

    // bob: 3500 (7 bounties) -> rank 2 (tie with charlie)
    expect(result[2].name).toBe("bob_coder");
    expect(result[2].rank).toBe(2);

    // eve: 2000 (5 bounties) -> rank 4 (skip 3)
    expect(result[3].name).toBe("eve_hacker");
    expect(result[3].rank).toBe(4);

    // diana: 2000 (4 bounties) -> rank 4
    expect(result[4].name).toBe("diana_dev");
    expect(result[4].rank).toBe(4);

    // frank: 2000 (3 bounties) -> rank 4
    expect(result[5].name).toBe("frank_dev");
    expect(result[5].rank).toBe(4);
  });

  it("should gracefully handle edge cases: empty list and single item", () => {
    expect(getRankedLeaderboard([])).toEqual([]);

    const single: LeaderboardEntry[] = [
      { id: "1", name: "solo", avatar: "", earned: 100, bounties_completed: 1 },
    ];
    const res = getRankedLeaderboard(single);
    expect(res).toHaveLength(1);
    expect(res[0].rank).toBe(1);
  });
});
