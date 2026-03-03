type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
  Medium:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800",
};

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <article className="card p-4 sm:p-5 hover:shadow-md hover:-translate-y-0.5 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words">{title}</h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Reward</p>
          <div className="text-xl sm:text-2xl font-bold">${reward}</div>
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span>{clampedProgress}%</span>
        </div>
        <div className="mt-1.5 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-2.5 rounded-full bg-brand-600 transition-all" style={{ width: `${clampedProgress}%` }} />
        </div>
      </div>
    </article>
  );
}
