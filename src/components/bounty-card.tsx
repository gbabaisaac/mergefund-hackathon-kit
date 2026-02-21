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

export function BountyCard({ title, reward, tags, difficulty, progress }: BountyCardProps) {
  return (
    <div className="card p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-500">Reward</div>
          <div className="text-xl font-bold">${reward}</div>
          <span className={`mt-2 inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${difficultyStyles[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-brand-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
