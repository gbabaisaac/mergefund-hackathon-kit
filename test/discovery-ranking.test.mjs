import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

async function importTypescriptModule(sourcePath) {
  const source = fs.readFileSync(sourcePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2020,
      strict: true,
    },
  }).outputText;
  const outPath = path.join(os.tmpdir(), `discovery-ranking-${Date.now()}.mjs`);
  fs.writeFileSync(outPath, compiled);
  return import(pathToFileURL(outPath).href);
}

const {
  explainDiscoveryScore,
  rankDiscoveryBounties,
} = await importTypescriptModule(
  path.resolve("src/lib/discovery-ranking.ts"),
);

const bounties = [
  {
    id: "low",
    title: "Low-value stale task",
    reward: 80,
    fundedPercent: 20,
    tags: ["docs"],
    claimedCount: 0,
    postedDaysAgo: 30,
  },
  {
    id: "winner",
    title: "High-value funded urgent task",
    reward: 500,
    fundedPercent: 95,
    tags: ["auth", "backend"],
    claimedCount: 2,
    postedDaysAgo: 1,
  },
  {
    id: "tie-a",
    title: "Tie A",
    reward: 300,
    fundedPercent: 80,
    tags: ["frontend"],
    claimedCount: 1,
    postedDaysAgo: 3,
  },
  {
    id: "tie-b",
    title: "Tie B",
    reward: 300,
    fundedPercent: 80,
    tags: ["frontend"],
    claimedCount: 1,
    postedDaysAgo: 3,
  },
];

test("ranks funded, valuable, recent bounties first and exposes score factors", () => {
  const ranked = rankDiscoveryBounties(bounties);

  assert.equal(ranked[0].id, "winner");
  assert.ok(ranked.every((item) => item.score >= 0));
  assert.ok(ranked.every((item, index) => index === 0 || ranked[index - 1].score >= item.score));

  const explanation = explainDiscoveryScore(bounties[1]);
  assert.deepEqual(Object.keys(explanation.factors), [
    "funding",
    "reward",
    "recency",
    "competition",
    "tagDiversity",
  ]);
  assert.equal(explanation.score, ranked[0].score);
});

test("uses title as a deterministic tie-breaker when scores match", () => {
  const ranked = rankDiscoveryBounties(bounties.filter((bounty) => bounty.id.startsWith("tie")));

  assert.deepEqual(ranked.map((bounty) => bounty.id), ["tie-a", "tie-b"]);
});
