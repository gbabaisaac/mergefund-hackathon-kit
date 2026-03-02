import clsx from "clsx";

export type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles: Record<BountyCardProps["difficulty"], string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const clampProgress = (value: number) => Math.min(100, Math.max(0, value));

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  const safeProgress = clampProgress(progress);

  return (
    <article
      className="group card relative overflow-hidden p-4 sm:p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
      aria-label={`Bounty: ${title}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 bg-gradient-to-br from-brand-50/80 via-transparent to-transparent transition duration-200 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-600">Featured</p>
          <h3 className="mt-1 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="pill text-[11px] sm:text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">Reward</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">
            {formatter.format(reward)}
          </p>
          <span
            className={clsx(
              "mt-2 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
              difficultyStyles[difficulty]
            )}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div
        className="mt-4"
        role="progressbar"
        aria-valuenow={safeProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
      >
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{safeProgress}%</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700"
            style={{ width: `${safeProgress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
