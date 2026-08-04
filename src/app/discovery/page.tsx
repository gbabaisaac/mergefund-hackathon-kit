"use client";

import { useMemo, useState } from "react";
import { mockDiscovery } from "@/data/mock-discovery";
import {
  rankBounties,
  rankingPresets,
  type RankingPreset,
  type ScoreBreakdown,
} from "./scoring";

const signalLabels: Record<keyof ScoreBreakdown, string> = {
  payout: "Payout quality",
  funding: "Funding confidence",
  competition: "Win probability",
  freshness: "Freshness",
};

const signalColors: Record<keyof ScoreBreakdown, string> = {
  payout: "bg-violet-500",
  funding: "bg-emerald-500",
  competition: "bg-cyan-500",
  freshness: "bg-amber-400",
};

function ScoreGauge({ score }: { score: number }) {
  return (
    <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 p-[3px] shadow-lg shadow-violet-500/15">
      <div className="grid h-full w-full place-items-center rounded-full bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            {score}
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            match
          </div>
        </div>
      </div>
    </div>
  );
}

function SignalBar({
  name,
  value,
  maximum,
}: {
  name: keyof ScoreBreakdown;
  value: number;
  maximum: number;
}) {
  const width = maximum > 0 ? Math.min(100, (value / maximum) * 100) : 0;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
        <span className="font-medium text-slate-500 dark:text-slate-400">
          {signalLabels[name]}
        </span>
        <span className="font-bold tabular-nums text-slate-700 dark:text-slate-200">
          +{value.toFixed(1)}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full ${signalColors[name]}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function DiscoveryPage() {
  const [preset, setPreset] = useState<RankingPreset>("balanced");
  const ranked = useMemo(() => rankBounties(mockDiscovery, preset), [preset]);
  const activePreset = rankingPresets[preset];

  return (
    <div className="space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-200/60 sm:px-9 sm:py-10 dark:border-slate-800 dark:shadow-black/20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              Explainable discovery
            </div>
            <h1 className="max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Find the bounty worth your next hour.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              A transparent 0–100 ranking that weighs upside, payout confidence,
              competition, and freshness—then shows exactly where every point came from.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              Current strategy
            </div>
            <div className="mt-1 text-lg font-bold">{activePreset.label}</div>
            <p className="mt-1 text-sm leading-5 text-slate-300">
              {activePreset.description}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="strategy-heading">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 id="strategy-heading" className="text-lg font-bold tracking-tight">
              Choose your strategy
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              The same four signals, weighted for the way you want to work.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-400">
            {ranked.length} opportunities ranked
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3" role="group" aria-label="Ranking strategy">
          {(Object.keys(rankingPresets) as RankingPreset[]).map((key) => {
            const option = rankingPresets[key];
            const selected = preset === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={selected}
                onClick={() => setPreset(key)}
                className={`rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${
                  selected
                    ? "border-violet-500 bg-violet-50 shadow-sm dark:bg-violet-500/10"
                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-900 dark:text-white">{option.label}</span>
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border ${
                      selected
                        ? "border-violet-600 bg-violet-600 text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {selected ? <span aria-hidden="true" className="text-xs">✓</span> : null}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="ranked-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="ranked-heading" className="text-lg font-bold tracking-tight">
            Ranked opportunities
          </h2>
          <span className="pill">Updated from mock data</span>
        </div>

        <div className="space-y-4">
          {ranked.map((bounty) => (
            <article
              key={bounty.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-black/20"
            >
              <div className="grid lg:grid-cols-[1fr_360px]">
                <div className="p-5 sm:p-7">
                  <div className="flex gap-4 sm:gap-6">
                    <ScoreGauge score={bounty.score} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white dark:bg-white dark:text-slate-950">
                          Rank {bounty.rank}
                        </span>
                        {bounty.tags.map((tag) => (
                          <span key={tag} className="pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-3 text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                        {bounty.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {bounty.explanation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      ["Reward", `$${bounty.reward}`],
                      ["Funded", `${bounty.fundedPercent}%`],
                      ["Claims", bounty.claimedCount.toString()],
                      ["Posted", `${bounty.postedDaysAgo}d ago`],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-900/60">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {label}
                        </div>
                        <div className="mt-0.5 font-black tabular-nums text-slate-800 dark:text-slate-100">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50/70 p-5 sm:p-7 lg:border-l lg:border-t-0 dark:border-slate-700 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      Score breakdown
                    </div>
                    <div className="text-xs font-bold tabular-nums text-violet-600 dark:text-violet-300">
                      {bounty.score} / 100
                    </div>
                  </div>
                  <div className="mt-5 space-y-4">
                    {(Object.keys(bounty.breakdown) as (keyof ScoreBreakdown)[]).map((name) => (
                      <SignalBar
                        key={name}
                        name={name}
                        value={bounty.breakdown[name]}
                        maximum={activePreset.weights[name]}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-2xl border border-dashed border-slate-300 p-5 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        <strong className="text-slate-800 dark:text-slate-200">How ranking stays honest:</strong>{" "}
        payout is log-normalized, funding is capped at 100%, competition uses diminishing
        returns, and freshness decays smoothly over 14 days. Stable tie-breakers keep the
        order deterministic.
      </aside>
    </div>
  );
}
