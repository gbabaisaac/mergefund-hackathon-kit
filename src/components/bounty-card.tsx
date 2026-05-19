import React from "react";

type BountyCardProps = {
  title: string;
  reward: number | string;
  tags?: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
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

  return (
    <article
      className="card p-4 sm:p-5 hover:shadow-md transition-shadow rounded-md border bg-white"
      aria-labelledby={`bounty-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            id={`bounty-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-base sm:text-lg font-semibold leading-snug break-words"
            title={title}
          >
            {title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-100 text-slate-700 rounded"
                aria-hidden="true"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0 ml-2">
          <div className="text-xl sm:text-xl font-bold">{rewardLabel}</div>
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{numericProgress}%</span>
        </div>

        <div
          className="mt-1.5 h-2 w-full rounded-full bg-slate-100 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={numericProgress}
          aria-label={`Progress: ${numericProgress}%`}
        >
          <div
            className="h-2 rounded-full bg-brand-600 transition-all duration-300"
            style={{ width: `${numericProgress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
