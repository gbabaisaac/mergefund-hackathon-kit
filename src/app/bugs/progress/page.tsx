"use client";

import { FundingProgressList } from "@/components/funding-progress";

export default function ProgressBugPage() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Bug: Progress Bar Overflow</h1>
        <p className="mt-2 text-slate-600">
          When a bounty receives more funding than its target, the progress bar breaks.
          Look at the bounties that are over-funded below.
        </p>
      </div>

      <div className="max-w-lg">
        <FundingProgressList />
      </div>

      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800">Your Task</h3>
        <ul className="mt-2 text-sm text-blue-700 space-y-2">
          <li>
            <strong>Bug 1:</strong> The progress bar width exceeds 100% when funded amount
            is greater than target, breaking out of its container.
          </li>
          <li>
            <strong>Bug 2:</strong> The percentage display shows values over 100% which
            looks incorrect.
          </li>
        </ul>
        <p className="mt-3 text-sm text-blue-700">
          Fix the <code className="bg-blue-100 px-1 rounded">FundingProgress</code> component
          in <code className="bg-blue-100 px-1 rounded">src/components/funding-progress.tsx</code>.
          Consider: should over-funded bounties show 100% or display differently?
        </p>
      </div>
    </div>
  );
}
