type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  Hard: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
};

function ProgressBar({ progress }: { progress: number }) {
  const color =
    progress >= 75 ? "bg-emerald-500" :
    progress >= 40 ? "bg-brand-500" :
    "bg-brand-400";

  return (
    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-2 rounded-full ${color} transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  return (
    <div className="card p-4 sm:p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-600 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug break-words text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-150">
            {title}
          </h3>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-300 hover:border-brand-300 dark:hover:border-brand-600 transition-colors duration-150 cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
            ${reward}
          </div>
          <span
            className={`mt-1 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${difficultyStyles[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span className={progress >= 75 ? "text-emerald-600 font-medium" : "text-slate-500"}>
            {progress}%
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Hover arrow indicator */}
      <div className="mt-3 flex items-center justify-end">
        <span className="text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium flex items-center gap-0.5">
          View bounty
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}
