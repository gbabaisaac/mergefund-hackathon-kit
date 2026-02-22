"use client";

// BUG: Progress bar can exceed 100% and breaks layout
// When funded_amount > target_amount, the progress bar overflows
// FIX: Clamp the percentage to 100% max

type FundingProgressProps = {
  funded: number;
  target: number;
  title: string;
};

// Mock bounties with various funding states
const mockBounties = [
  { id: "1", title: "Fix memory leak", funded: 50, target: 100 },
  { id: "2", title: "Add dark mode", funded: 100, target: 100 },
  { id: "3", title: "Optimize queries", funded: 150, target: 100 }, // BUG: Over-funded!
  { id: "4", title: "Refactor auth", funded: 200, target: 100 }, // BUG: Way over-funded!
  { id: "5", title: "Add tests", funded: 75, target: 100 },
];

export function FundingProgress({ funded, target, title }: FundingProgressProps) {
  // BUG: No clamping - percentage can exceed 100%
  const percentage = (funded / target) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{title}</span>
        <span className="text-slate-500">
          ${funded} / ${target}
          {/* BUG: Shows percentage over 100% which looks wrong */}
          <span className="ml-2 text-xs">({percentage.toFixed(0)}%)</span>
        </span>
      </div>
      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
        {/* BUG: Width can exceed 100%, breaking out of container */}
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
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
