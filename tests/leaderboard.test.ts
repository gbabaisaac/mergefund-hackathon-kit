import assert from "node:assert/strict";
import test from "node:test";

import { rankLeaderboardEntries, sortLeaderboardEntries } from "../src/lib/leaderboard.ts";

const entries = [
  { id: "3", name: "Charlie", earned: 2000 },
  { id: "1", name: "Alice", earned: 3500 },
  { id: "2", name: "Bob", earned: 3500 },
  { id: "4", name: "Diana", earned: 2000 },
  { id: "5", name: "Eve", earned: 1000 },
];

test("sorts by earnings descending and name for deterministic ties", () => {
  const sorted = sortLeaderboardEntries(entries);

  assert.deepEqual(
    sorted.map((entry) => entry.name),
    ["Alice", "Bob", "Charlie", "Diana", "Eve"],
  );
});

test("assigns the same rank to equal earnings", () => {
  const ranked = rankLeaderboardEntries(entries);

  assert.deepEqual(
    ranked.map((entry) => [entry.name, entry.rank]),
    [
      ["Alice", 1],
      ["Bob", 1],
      ["Charlie", 3],
      ["Diana", 3],
      ["Eve", 5],
    ],
  );
});
