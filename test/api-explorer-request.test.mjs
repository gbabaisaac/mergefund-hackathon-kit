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
    `mergefund-request-${process.pid}-${Date.now()}.mjs`,
  );
  fs.writeFileSync(temporaryPath, output);
  return import(pathToFileURL(temporaryPath).href);
}

const { buildRequestUrl, codeSample, createRequestDraft, validateRequestBody } =
  await importTypescriptModule(path.resolve("src/app/api-explorer/request.ts"));

const endpoint = {
  id: "retrieve",
  group: "Bounties",
  method: "GET",
  path: "/v1/bounties/:bounty_id",
  summary: "Retrieve a bounty",
  description: "Fixture",
  parameters: [
    { name: "bounty_id", value: "bnty_1", location: "path", enabled: true },
    { name: "include", value: "funding history", location: "query", enabled: true },
    { name: "cursor", value: "next", location: "query", enabled: false },
  ],
  status: 200,
  timing: 42,
  response: { ok: true },
};

test("builds a URL from the live draft and encodes user input", () => {
  const draft = createRequestDraft(endpoint);
  draft.parameters[0].value = "bnty/with spaces";

  assert.equal(
    buildRequestUrl(endpoint, draft),
    "https://api.mergefund.dev/v1/bounties/bnty%2Fwith%20spaces?include=funding%20history",
  );
});

test("query toggles immediately add and remove parameters", () => {
  const draft = createRequestDraft(endpoint);
  draft.parameters[1].enabled = false;
  draft.parameters[2].enabled = true;

  assert.equal(
    buildRequestUrl(endpoint, draft),
    "https://api.mergefund.dev/v1/bounties/bnty_1?cursor=next",
  );
});

test("generated snippets use the edited URL and body", () => {
  const postEndpoint = { ...endpoint, method: "POST", path: "/v1/bounties" };
  const draft = createRequestDraft(postEndpoint);
  draft.parameters = [];
  draft.requestBody = '{"reward":25000}';

  for (const language of ["cURL", "JavaScript", "Python"]) {
    const sample = codeSample(postEndpoint, draft, language);
    assert.match(sample, /https:\/\/api\.mergefund\.dev\/v1\/bounties/);
    assert.match(sample, /25000/);
  }
});

test("validates edited request JSON without throwing", () => {
  assert.equal(validateRequestBody({ parameters: [], requestBody: '{"ok":true}' }), null);
  assert.match(
    validateRequestBody({ parameters: [], requestBody: '{"ok":' }),
    /valid JSON/,
  );
  assert.equal(validateRequestBody({ parameters: [] }), null);
});
