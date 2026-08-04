"use client";

import { useMemo, useState } from "react";
import {
  mockApiEndpoints,
  type HttpMethod,
} from "@/data/mock-api-endpoints";
import {
  buildRequestUrl,
  codeSample,
  createRequestDraft,
  validateRequestBody,
  type ApiRequestDraft,
  type CodeLanguage,
} from "./request";

const methodStyles: Record<HttpMethod, string> = {
  GET: "bg-emerald-400/15 text-emerald-700 dark:text-emerald-300",
  POST: "bg-violet-400/15 text-violet-700 dark:text-violet-300",
  PATCH: "bg-amber-400/15 text-amber-700 dark:text-amber-300",
};

const tabs = ["Parameters", "Headers", "Body"] as const;
type RequestTab = (typeof tabs)[number];

function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span className={`rounded-md px-2 py-1 font-mono text-[10px] font-black ${methodStyles[method]}`}>
      {method}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="grid min-h-52 place-items-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
      <div>
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-slate-400">
          {"{ }"}
        </div>
        <p className="mt-3 text-sm text-slate-400">{message}</p>
      </div>
    </div>
  );
}

export default function ApiExplorerPage() {
  const [selectedId, setSelectedId] = useState(mockApiEndpoints[0].id);
  const [search, setSearch] = useState("");
  const [requestTab, setRequestTab] = useState<RequestTab>("Parameters");
  const [language, setLanguage] = useState<CodeLanguage>("cURL");
  const [isSending, setIsSending] = useState(false);
  const [hasResponse, setHasResponse] = useState(true);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, ApiRequestDraft>>(() =>
    Object.fromEntries(
      mockApiEndpoints.map((item) => [item.id, createRequestDraft(item)]),
    ),
  );

  const endpoint =
    mockApiEndpoints.find((item) => item.id === selectedId) ?? mockApiEndpoints[0];
  const draft = drafts[endpoint.id] ?? createRequestDraft(endpoint);
  const bodyError = validateRequestBody(draft);
  const groups = useMemo(() => {
    const query = search.trim().toLowerCase();
    return ["Bounties", "Developers", "Funding"].map((group) => ({
      group,
      endpoints: mockApiEndpoints.filter(
        (item) =>
          item.group === group &&
          (!query ||
            item.summary.toLowerCase().includes(query) ||
            item.path.toLowerCase().includes(query)),
      ),
    }));
  }, [search]);

  const sendRequest = () => {
    if (bodyError) return;
    setIsSending(true);
    setHasResponse(false);
    window.setTimeout(() => {
      setIsSending(false);
      setHasResponse(true);
    }, 650);
  };

  const updateParameter = (
    index: number,
    patch: Partial<ApiRequestDraft["parameters"][number]>,
  ) => {
    setDrafts((current) => {
      const currentDraft = current[endpoint.id] ?? createRequestDraft(endpoint);
      return {
        ...current,
        [endpoint.id]: {
          ...currentDraft,
          parameters: currentDraft.parameters.map((parameter, parameterIndex) =>
            parameterIndex === index ? { ...parameter, ...patch } : parameter,
          ),
        },
      };
    });
  };

  const updateRequestBody = (requestBody: string) => {
    setDrafts((current) => ({
      ...current,
      [endpoint.id]: {
        ...(current[endpoint.id] ?? createRequestDraft(endpoint)),
        requestBody,
      },
    }));
  };

  const sample = codeSample(endpoint, draft, language);
  const copySample = async () => {
    await navigator.clipboard?.writeText(sample);
    setCopiedSnippet(true);
    window.setTimeout(() => setCopiedSnippet(false), 1200);
  };

  const copyResponse = async () => {
    await navigator.clipboard?.writeText(JSON.stringify(endpoint.response, null, 2));
    setCopiedResponse(true);
    window.setTimeout(() => setCopiedResponse(false), 1200);
  };

  return (
    <div className="-mx-4 -my-10 min-h-[calc(100vh-73px)] bg-[#070b14] text-slate-100 sm:-mx-6">
      <div className="border-b border-white/10 bg-[#090e19]/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-mono text-sm font-black text-white shadow-lg shadow-violet-500/20">
              M/
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black tracking-tight text-white">MergeFund API</h1>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Mock mode
                </span>
              </div>
              <p className="text-xs text-slate-500">Explore, compose, and understand every request.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <label htmlFor="environment" className="sr-only">Environment</label>
            <select
              id="environment"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-semibold text-slate-300 outline-none focus:border-violet-400"
              defaultValue="sandbox"
            >
              <option value="sandbox">Sandbox · api.mergefund.dev</option>
              <option value="production">Production · locked</option>
            </select>
            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/10">
              Read docs ↗
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-[#090e19] p-4 lg:min-h-[calc(100vh-146px)] lg:border-b-0 lg:border-r">
          <label className="relative block">
            <span className="pointer-events-none absolute left-3 top-2.5 text-slate-500">⌕</span>
            <span className="sr-only">Search endpoints</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search endpoints"
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-violet-400/70 focus:ring-2 focus:ring-violet-500/10"
            />
          </label>

          <nav className="mt-5 max-h-72 space-y-5 overflow-y-auto pr-1 lg:max-h-[calc(100vh-230px)]" aria-label="API endpoints">
            {groups.map(({ group, endpoints }) =>
              endpoints.length ? (
                <div key={group}>
                  <div className="mb-2 px-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
                    {group}
                  </div>
                  <div className="space-y-1">
                    {endpoints.map((item) => {
                      const selected = item.id === endpoint.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSelectedId(item.id);
                            setRequestTab("Parameters");
                            setHasResponse(true);
                          }}
                          className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition ${
                            selected
                              ? "bg-violet-500/15 ring-1 ring-inset ring-violet-400/25"
                              : "hover:bg-white/[0.04]"
                          }`}
                        >
                          <MethodBadge method={item.method} />
                          <span className={`truncate text-xs font-semibold ${selected ? "text-white" : "text-slate-400"}`}>
                            {item.summary}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null,
            )}
          </nav>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <MethodBadge method={endpoint.method} />
                <code className="text-sm font-semibold text-cyan-300 sm:text-base">{endpoint.path}</code>
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                {endpoint.summary}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{endpoint.description}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>API version</span>
              <span className="rounded-md bg-white/5 px-2 py-1 font-mono text-slate-300">2026-08-01</span>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1320] shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  Request
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Editable mock</span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-[#070b14] focus-within:border-violet-400/60">
                  <span className="border-r border-white/10 px-3 py-3 font-mono text-xs font-black text-emerald-300">
                    {endpoint.method}
                  </span>
                  <input
                    aria-label="Request URL"
                    className="min-w-0 flex-1 bg-transparent px-3 font-mono text-xs text-slate-300 outline-none"
                    value={buildRequestUrl(endpoint, draft)}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={sendRequest}
                    disabled={isSending || Boolean(bodyError)}
                    title={bodyError ?? undefined}
                    className="m-1.5 min-w-20 rounded-lg bg-violet-500 px-3 py-2 text-xs font-black text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 disabled:cursor-wait disabled:opacity-60"
                  >
                    {isSending ? "Sending…" : "Send"}
                  </button>
                </div>

                <div className="mt-5 flex gap-5 overflow-x-auto border-b border-white/10">
                  {tabs.map((tab) => {
                    const unavailable = tab === "Body" && !endpoint.requestBody;
                    return (
                      <button
                        key={tab}
                        type="button"
                        disabled={unavailable}
                        onClick={() => setRequestTab(tab)}
                        className={`border-b-2 pb-3 text-xs font-bold transition ${
                          requestTab === tab
                            ? "border-violet-400 text-white"
                            : "border-transparent text-slate-500 hover:text-slate-300 disabled:cursor-not-allowed disabled:opacity-30"
                        }`}
                      >
                        {tab}
                        {tab === "Parameters" && endpoint.parameters.length ? (
                          <span className="ml-1.5 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px]">
                            {endpoint.parameters.length}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 min-h-52">
                  {requestTab === "Parameters" && draft.parameters.length ? (
                    <div className="space-y-2">
                      <div className="grid grid-cols-[24px_1fr_1fr_60px] gap-2 px-2 text-[9px] font-black uppercase tracking-wider text-slate-600">
                        <span />
                        <span>Key</span>
                        <span>Value</span>
                        <span>In</span>
                      </div>
                      {draft.parameters.map((parameter, parameterIndex) => (
                        <div key={parameter.name} className="grid grid-cols-[24px_1fr_1fr_60px] items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-2">
                          <input
                            aria-label={`Enable ${parameter.name}`}
                            type="checkbox"
                            checked={parameter.enabled}
                            onChange={(event) =>
                              updateParameter(parameterIndex, { enabled: event.target.checked })
                            }
                            className="accent-violet-500"
                          />
                          <code className="truncate text-xs text-cyan-300">{parameter.name}</code>
                          <input
                            aria-label={`${parameter.name} value`}
                            value={parameter.value}
                            onChange={(event) =>
                              updateParameter(parameterIndex, { value: event.target.value })
                            }
                            placeholder="Empty"
                            className="min-w-0 rounded-md border border-white/10 bg-[#070b14] px-2 py-1.5 font-mono text-xs text-slate-300 outline-none focus:border-violet-400/50"
                          />
                          <span className="text-[10px] font-semibold text-slate-600">{parameter.location}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {requestTab === "Parameters" && !draft.parameters.length ? (
                    <EmptyState message="This endpoint has no URL parameters." />
                  ) : null}
                  {requestTab === "Headers" ? (
                    <div className="space-y-2">
                      {[
                        ["Authorization", "Bearer ••••••••••••7A2F"],
                        ["Content-Type", "application/json"],
                      ].map(([key, value]) => (
                        <div key={key} className="grid gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] p-3 sm:grid-cols-2">
                          <code className="text-xs text-cyan-300">{key}</code>
                          <code className="break-all text-xs text-slate-400">{value}</code>
                        </div>
                      ))}
                      <p className="pt-2 text-xs leading-5 text-slate-600">Secrets are always redacted in the explorer and generated snippets.</p>
                    </div>
                  ) : null}
                  {requestTab === "Body" && draft.requestBody !== undefined ? (
                    <div>
                      <textarea
                        aria-label="JSON request body"
                        aria-invalid={Boolean(bodyError)}
                        aria-describedby={bodyError ? "request-body-error" : undefined}
                        value={draft.requestBody}
                        onChange={(event) => updateRequestBody(event.target.value)}
                        spellCheck={false}
                        className={`h-52 w-full resize-none rounded-xl border bg-[#070b14] p-4 font-mono text-xs leading-5 text-emerald-300 outline-none ${
                          bodyError
                            ? "border-rose-400/70 focus:border-rose-300"
                            : "border-white/10 focus:border-violet-400/50"
                        }`}
                      />
                      {bodyError ? (
                        <p id="request-body-error" className="mt-2 text-xs font-semibold text-rose-300">
                          {bodyError}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1320] shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <span className={`h-2 w-2 rounded-full ${isSending ? "animate-pulse bg-amber-300" : "bg-emerald-400 shadow-[0_0_10px_#34d399]"}`} />
                  Response
                </div>
                {hasResponse ? (
                  <div className="flex items-center gap-3 font-mono text-[10px]">
                    <span className="font-black text-emerald-300">{endpoint.status} {endpoint.status === 201 ? "Created" : "OK"}</span>
                    <span className="text-slate-600">{endpoint.timing} ms</span>
                    <button
                      type="button"
                      onClick={copyResponse}
                      className="rounded-md border border-white/10 px-2 py-1 font-sans font-bold text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                      {copiedResponse ? "Copied ✓" : "Copy JSON"}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="p-4 sm:p-5">
                {hasResponse ? (
                  <pre className="h-[350px] overflow-auto rounded-xl border border-white/[0.07] bg-[#070b14] p-4 font-mono text-xs leading-6 text-emerald-300 sm:h-[430px]">
                    <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                  </pre>
                ) : (
                  <div className="grid h-[350px] place-items-center rounded-xl border border-white/[0.07] bg-[#070b14] sm:h-[430px]">
                    <div className="text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
                      <p className="mt-3 text-xs font-semibold text-slate-500">Contacting sandbox…</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1320]">
            <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="flex items-center gap-4 overflow-x-auto">
                <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-600">Code</span>
                {(["cURL", "JavaScript", "Python"] as CodeLanguage[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setLanguage(item)}
                    className={`text-xs font-bold ${language === item ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={copySample}
                className="self-start rounded-lg border border-white/10 px-3 py-1.5 text-[10px] font-bold text-slate-400 transition hover:bg-white/5 hover:text-white sm:self-auto"
              >
                {copiedSnippet ? "Copied ✓" : "Copy snippet"}
              </button>
            </div>
            <pre className="max-h-72 overflow-auto bg-[#070b14] p-5 font-mono text-xs leading-6 text-cyan-200">
              <code>{sample}</code>
            </pre>
          </section>
        </main>
      </div>
    </div>
  );
}
