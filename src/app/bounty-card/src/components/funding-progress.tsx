"use client";

// FIXED: Progress bar now properly clamped to 0-100%
// Handles both over-funding and division by zero cases

type FundingProgressProps = {
  funded: number;
  target: number;
  title: string;
};

// Mock bounties with various funding states
const mockBounties = [
  { id: "1", title: "Fix memory leak", funded: 50, target: 100 },
  { id: "2", title: "Add dark mode", funded: 100, target: 100 },
  { id: "3", title: "Optimize queries", funded: 150, target: 100 }, // Over-funded (now handled)
  { id: "4", title: "Refactor auth", funded: 200, target: 100 }, // Over-funded (now handled)
  { id: "5", title: "Add tests", funded: 75, target: 100 },
  { id: "6", title: "Zero target bug", funded: 50, target: 0 }, // Edge case: zero target
];

export function FundingProgress({ funded, target, title }: FundingProgressProps) {
  // FIX: Clamp percentage to 0-100% and handle division by zero
  // When target is 0, show 0% if funded is also 0, or 100% if funded > 0
  const rawPercentage = target > 0 ? (funded / target) * 100 : (funded > 0 ? 100 : 0);
  const percentage = Math.min(Math.max(rawPercentage, 0), 100); // Clamp to 0-100
  
  // Determine color based on funding status
  const getProgressColor = () => {
    if (rawPercentage >= 100) return "from-green-400 to-emerald-500"; // Fully funded
    if (rawPercentage >= 50) return "from-blue-400 to-blue-600"; // Halfway there
    return "from-amber-400 to-amber-600"; // Just starting
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{title}</span>
        <span className="text-slate-500">
          ${funded} / ${target}
          {/* Show actual percentage (capped at 100% for display) */}
          <span className="ml-2 text-xs">
            ({percentage.toFixed(0)}%{rawPercentage > 100 && " (over-funded)"})
          </span>
        </span>
      </div>
      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        {/* FIXED: Width is now properly clamped to 100% max */}
        <div
          className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export function FundingProgressList() {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold">Bounty Funding Progress</h3>

      <div className="space-y-4">
        {mockBounties.map((bounty) => (
          <FundingProgress
            key={bounty.id}
            title={bounty.title}
            funded={bounty.funded}
            target={bounty.target}
          />
        ))}
      </div>

      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-xs text-amber-700">
          <strong>Bug hint:</strong> Look at the progress bars for &quot;Optimize queries&quot; and &quot;Refactor auth&quot;.
          The progress bar extends beyond its container! The percentage also shows values over 100%.
        </p>
      </div>
    </div>
  );
}
