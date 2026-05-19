import React from "react";

type BountyCardProps = {
  title: string;
  reward: number | string;
  tags?: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-200 dark:border-emerald-500/30",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:border-amber-500/30",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-200 dark:border-rose-500/30",
};

export function BountyCard({
  title,
  reward,
  tags = [],
  difficulty,
  progress,
}: BountyCardProps) {
  // Ensure numeric progress and clamp to [0, 100] to avoid style/console issues
  const numericProgress = Math.min(100, Math.max(0, Number(progress) || 0));

  // Format reward using locale-correct currency formatting (USD shown as example)
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
  const rewardLabel =
    typeof reward === "number" ? formatter.format(reward) : String(reward);

  const titleId = `bounty-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/90"
      aria-labelledby={titleId}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-500/10 via-transparent to-emerald-500/10" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${difficultyStyles[difficulty]}`}
            >
              {difficulty}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white dark:bg-white dark:text-slate-900">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {rewardLabel}
            </span>
          </div>

          <h3
            id={titleId}
            className="text-base font-semibold leading-snug text-slate-900 sm:text-lg dark:text-white"
            title={title}
          >
            {title}
          </h3>

          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                aria-hidden="true"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{numericProgress}%</span>
        </div>

        <div
          className="mt-2 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={numericProgress}
          aria-label={`Progress: ${numericProgress}%`}
        >
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-brand-500 via-indigo-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${numericProgress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
