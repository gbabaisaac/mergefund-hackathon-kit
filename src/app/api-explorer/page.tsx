"use client";

import { useMemo, useState } from "react";

type Endpoint = {
  id: string;
  title: string;
  method: "GET" | "POST";
  path: string;
  summary: string;
  auth: string;
  response: Record<string, unknown>;
  fields: Array<{ name: string; type: string; description: string }>;
};

const endpoints: Endpoint[] = [
  {
    id: "bounties",
    title: "List bounties",
    method: "GET",
    path: "/v1/bounties",
    summary: "Find funded work that matches a contributor's skills.",
    auth: "Public",
    fields: [
      { name: "status", type: "string", description: "Filter by open, funded, or completed." },
      { name: "limit", type: "number", description: "Maximum number of records to return." },
    ],
    response: {
      data: [
        { id: "bf_1042", title: "Improve onboarding flow", reward: 480, status: "funded" },
        { id: "bf_1041", title: "Add export to CSV", reward: 220, status: "open" },
      ],
      nextCursor: "eyJwYWdlIjoyfQ==",
    },
  },
  {
    id: "contributor",
    title: "Contributor profile",
    method: "GET",
    path: "/v1/contributors/me",
    summary: "Read delivery history and reputation signals.",
    auth: "Bearer token",
    fields: [
      { name: "include", type: "string", description: "Choose stats, skills, or recent work." },
      { name: "locale", type: "string", description: "Format dates for a preferred locale." },
    ],
    response: {
      id: "con_2048",
      displayName: "Alex Rivera",
      reputation: 4.9,
      shipped: 18,
      skills: ["React", "TypeScript", "Accessibility"],
    },
  },
  {
    id: "claim",
    title: "Claim a bounty",
    method: "POST",
    path: "/v1/bounties/bf_1042/claim",
    summary: "Signal intent before starting a scoped deliverable.",
    auth: "Bearer token",
    fields: [
      { name: "branch", type: "string", description: "Feature branch that will contain the work." },
      { name: "etaDays", type: "number", description: "Expected delivery time in days." },
    ],
    response: {
      claimId: "cl_8e31",
      bountyId: "bf_1042",
      status: "pending_review",
      expiresAt: "2026-08-09T18:00:00Z",
    },
  },
];

const methodStyles: Record<Endpoint["method"], string> = {
  GET: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/30",
  POST: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-400/10 dark:text-violet-300 dark:border-violet-400/30",
};

function formatJson(value: Record<string, unknown>) {
  return JSON.stringify(value, null, 2);
}

export default function ApiExplorerPage() {
  const [selectedId, setSelectedId] = useState(endpoints[0].id);
  const [query, setQuery] = useState("status=funded&limit=10");
  const [environment, setEnvironment] = useState("Mock data");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = useMemo(
    () => endpoints.find((endpoint) => endpoint.id === selectedId) ?? endpoints[0],
    [selectedId],
  );
  const requestUrl = `https://api.mergefund.dev${selected.path}${query ? `?${query}` : ""}`;

  async function copyResponse() {
    await navigator.clipboard?.writeText(formatJson(selected.response));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-violet-50 p-6 shadow-sm dark:border-brand-800 dark:from-brand-950/60 dark:via-slate-900 dark:to-violet-950/40 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-200/60 blur-3xl dark:bg-brand-500/10" />
        <div className="relative max-w-3xl">
          <span className="pill border-brand-200 bg-white/70 text-brand-700 dark:border-brand-700 dark:bg-slate-900/50 dark:text-brand-300">
            Developer tools · v1
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Explore your API surface before you ship it.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
            Compose a request, inspect a realistic response, and understand the contract at a glance. Every example is local mock data, so the explorer is safe to demo offline.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm dark:bg-slate-800/80">3 example endpoints</span>
            <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm dark:bg-slate-800/80">No credentials required</span>
            <span className="rounded-full bg-white/80 px-3 py-1.5 shadow-sm dark:bg-slate-800/80">Keyboard friendly</span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="card h-fit overflow-hidden">
          <div className="border-b border-slate-200 p-5 dark:border-slate-700">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Endpoints</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose an example request.</p>
          </div>
          <div className="space-y-1 p-2">
            {endpoints.map((endpoint) => {
              const active = endpoint.id === selected.id;
              return (
                <button
                  key={endpoint.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(endpoint.id);
                    setSent(false);
                  }}
                  className={`w-full rounded-xl p-3 text-left transition ${active ? "bg-brand-50 ring-1 ring-brand-200 dark:bg-brand-400/10 dark:ring-brand-400/30" : "hover:bg-slate-50 dark:hover:bg-slate-800"}`}
                  aria-pressed={active}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold ${methodStyles[endpoint.method]}`}>
                      {endpoint.method}
                    </span>
                    <span className="text-xs text-slate-400">200</span>
                  </div>
                  <span className="mt-2 block text-sm font-semibold text-slate-800 dark:text-slate-100">{endpoint.title}</span>
                  <span className="mt-1 block truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">{endpoint.path}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          <div className="card overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-md border px-2 py-1 text-xs font-bold ${methodStyles[selected.method]}`}>{selected.method}</span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">{selected.title}</h2>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{selected.summary}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Mock endpoint
              </span>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)]">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="environment">Environment</label>
                <select id="environment" value={environment} onChange={(event) => setEnvironment(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none ring-brand-200 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
                  <option>Mock data</option>
                  <option>Staging preview</option>
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-[150px_minmax(0,1fr)]">
                <label className="pt-2 text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="query">Query parameters</label>
                <div>
                  <input id="query" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 font-mono text-sm text-slate-800 outline-none ring-brand-200 focus:ring-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100" aria-describedby="query-help" />
                  <p id="query-help" className="mt-2 text-xs text-slate-500 dark:text-slate-400">Use <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">key=value</code> pairs separated by <code className="rounded bg-slate-100 px-1 py-0.5 dark:bg-slate-800">&amp;</code>.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-xl bg-slate-950 p-4 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
                <code className="min-w-0 break-all text-[12px] text-slate-300">{requestUrl}</code>
                <button type="button" className="btn shrink-0" onClick={() => setSent(true)}>{sent ? "Request sent" : "Send request"}</button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-700">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Response</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{sent ? "Received just now" : "Send the request to preview data"}</p>
                </div>
                <button type="button" onClick={copyResponse} className="btn-outline text-xs">{copied ? "Copied" : "Copy JSON"}</button>
              </div>
              <div className="flex flex-wrap gap-2 border-b border-slate-200 px-5 py-3 text-xs dark:border-slate-700">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">200 OK</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">{environment}</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">128 ms</span>
              </div>
              <pre className="max-h-[420px] overflow-auto bg-slate-950 p-5 text-[12px] leading-6 text-emerald-300" aria-label="JSON response">{formatJson(selected.response)}</pre>
            </div>

            <div className="card h-fit overflow-hidden">
              <div className="border-b border-slate-200 p-5 dark:border-slate-700">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Request fields</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">What this endpoint accepts.</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {selected.fields.map((field) => (
                  <div key={field.name} className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <code className="text-sm font-semibold text-slate-800 dark:text-slate-100">{field.name}</code>
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">{field.type}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{field.description}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Authentication</span>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{selected.auth}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
