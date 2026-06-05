type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800",
};

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  return (
    <div className="card p-4 sm:p-5 hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words group-hover:text-brand-600 transition-colors">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="pill text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">${reward.toLocaleString()}</div>
          <span className={`mt-1.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium">Funding Progress</span>
          <span className="font-semibold">{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
