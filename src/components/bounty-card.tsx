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

const progressColor = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-brand-600",
};

function getProgressColor(progress: number) {
  if (progress < 35) return progressColor.low;
  if (progress < 70) return progressColor.medium;
  return progressColor.high;
}

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  return (
    <div className="group relative card p-4 sm:p-5 border border-slate-200 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-100 transition-all duration-200 ease-out hover:-translate-y-0.5 cursor-pointer bg-white rounded-xl">
      {/* Top row: title + reward badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900 group-hover:text-brand-700 transition-colors duration-200 break-words">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-0.5 bg-brand-50 text-brand-700 border border-brand-200 hover:bg-brand-100 transition-colors duration-150"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
          <div className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors duration-200 tabular-nums">
            <span className="text-sm font-medium text-slate-400">$</span>
            {reward.toLocaleString()}
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${difficultyStyles[difficulty]}`}
          >
            {difficulty === "Easy" && (
              <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {difficulty === "Medium" && (
              <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L9 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {difficulty === "Hard" && (
              <svg className="w-2.5 h-2.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            )}
            {difficulty}
          </span>
        </div>
      </div>

      {/* Progress bar section */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-medium">Progress</span>
          <span className="tabular-nums font-semibold text-slate-700">{progress}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className={`h-2.5 rounded-full ${getProgressColor(progress)} transition-all duration-500 ease-out group-hover:shadow-md group-hover:brightness-110`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
