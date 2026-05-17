import Image from "next/image";

type BountyCardProps = {
  title: string;
  reward: number;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
};

const difficultyStyles = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-rose-50 text-rose-700 border-rose-200",
};

const difficultyDots = {
  Easy: "bg-emerald-500",
  Medium: "bg-amber-500",
  Hard: "bg-rose-500",
};

function formatReward(reward: number): string {
  if (reward >= 1000) {
    return `$${(reward / 1000).toFixed(1)}k`;
  }
  return `$${reward}`;
}

function getProgressColor(progress: number): string {
  if (progress >= 75) return "bg-emerald-500";
  if (progress >= 40) return "bg-brand-500";
  return "bg-slate-400";
}

function getProgressTextColor(progress: number): string {
  if (progress >= 75) return "text-emerald-600 dark:text-emerald-400";
  if (progress >= 40) return "text-brand-600 dark:text-brand-400";
  return "text-slate-500";
}

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  return (
    <div className="card p-4 sm:p-5 hover:shadow-md transition group cursor-pointer">
      {/* Header: Repo info + Tier badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center flex-shrink-0">
            <span className="text-[8px] font-bold text-white">MF</span>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
            mergefund/hackathon
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] sm:text-xs font-semibold whitespace-nowrap ${difficultyStyles[difficulty]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${difficultyDots[difficulty]}`} />
          {difficulty}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold leading-snug break-words line-clamp-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {title}
      </h3>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className="pill text-[11px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
            {tag}
          </span>
        ))}
      </div>

      {/* Separator */}
      <div className="mt-4 border-t border-slate-100 dark:border-slate-700" />

      {/* Footer: Reward + Progress + PR count */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-xl font-bold text-slate-900 dark:text-white">
            {formatReward(reward)}
          </span>
          {reward >= 500 && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded">
              ⚡ High Value
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h4m-2-2v4m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            0 PRs
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>Progress</span>
          <span className={getProgressTextColor(progress)}>{progress}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}