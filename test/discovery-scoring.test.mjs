import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";
import ts from "typescript";

async function importTypescriptModule(sourcePath) {
  const source = fs.readFileSync(sourcePath, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2020,
      strict: true,
    },
  }).outputText;
  const temporaryPath = path.join(
    os.tmpdir(),
    `mergefund-discovery-${process.pid}-${Date.now()}.mjs`,
  );
  fs.writeFileSync(temporaryPath, output);
  return import(pathToFileURL(temporaryPath).href);
}

const { rankBounties, rankingPresets, scoreBounty } =
  await importTypescriptModule(path.resolve("src/app/discovery/scoring.ts"));

const opportunities = [
  {
    id: "funded",
    title: "Funded opportunity",
    reward: 250,
    fundedPercent: 100,
    tags: ["typescript"],
    claimedCount: 1,
    postedDaysAgo: 2,
  },
  {
    id: "crowded",
    title: "Crowded opportunity",
    reward: 500,
    fundedPercent: 65,
    tags: ["frontend"],
    claimedCount: 12,
    postedDaysAgo: 18,
  },
  {
    id: "fresh",
    title: "Fresh opportunity",
    reward: 120,
    fundedPercent: 90,
    tags: ["docs"],
    claimedCount: 0,
    postedDaysAgo: 0,
  },
];

test("returns a bounded, explainable score for every strategy", () => {
  for (const [preset, definition] of Object.entries(rankingPresets)) {
    const result = scoreBounty(opportunities[0], 500, preset);

    assert.ok(result.score >= 0 && result.score <= 100);
    assert.equal(
      result.score,
      Object.values(result.breakdown).reduce((sum, value) => sum + value, 0),
    );
    for (const [signal, value] of Object.entries(result.breakdown)) {
      assert.ok(value >= 0 && value <= definition.weights[signal]);
    }
    assert.ok(result.explanation.length > 20);
  }
});

test("changes the recommendation when the user changes strategy", () => {
  const highestUpside = rankBounties(opportunities, "highValue");
  const quickWins = rankBounties(opportunities, "quickWin");

  assert.notDeepEqual(
    highestUpside.map(({ id }) => id),
    quickWins.map(({ id }) => id),
  );
  assert.equal(quickWins[0].id, "fresh");
});

test("is deterministic, assigns consecutive ranks, and never mutates input", () => {
  const original = structuredClone(opportunities);
  const first = rankBounties(opportunities, "balanced");
  const second = rankBounties(opportunities, "balanced");

  assert.deepEqual(first, second);
  assert.deepEqual(opportunities, original);
  assert.deepEqual(first.map(({ rank }) => rank), [1, 2, 3]);
});

test("handles empty and defensive boundary inputs without NaN", () => {
  assert.deepEqual(rankBounties([], "balanced"), []);

  const [ranked] = rankBounties(
    [{
      id: "boundary",
      title: "Boundary input",
      reward: -100,
      fundedPercent: 180,
      tags: [],
      claimedCount: -3,
      postedDaysAgo: -5,
    }],
    "balanced",
  );

  assert.ok(Number.isFinite(ranked.score));
  assert.ok(ranked.score >= 0 && ranked.score <= 100);
  assert.equal(ranked.breakdown.payout, 0);
  assert.equal(ranked.breakdown.funding, 30);
  assert.equal(ranked.breakdown.competition, 25);
  assert.equal(ranked.breakdown.freshness, 15);
});
