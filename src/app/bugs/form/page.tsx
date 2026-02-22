"use client";

import { CreateBountyForm } from "@/components/create-bounty-form";

export default function FormBugPage() {
  const handleSubmit = (bounty: { title: string; reward: number; difficulty: string }) => {
    console.log("Bounty submitted:", bounty);
  };

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="text-2xl font-bold">Bug: Double Submission & Validation</h1>
        <p className="mt-2 text-slate-600">
          This form has multiple bugs. Try clicking the submit button rapidly, or submit with
          empty/negative values.
        </p>
      </div>

      <div className="max-w-md">
        <CreateBountyForm onSubmit={handleSubmit} />
      </div>

      <div className="card p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800">Your Task</h3>
        <ul className="mt-2 text-sm text-blue-700 space-y-2">
          <li>
            <strong>Bug 1:</strong> The submit button is not disabled during form submission,
            allowing multiple rapid clicks to create duplicate entries.
          </li>
          <li>
            <strong>Bug 2:</strong> No form validation - empty titles and negative reward values
            are accepted.
          </li>
        </ul>
        <p className="mt-3 text-sm text-blue-700">
          Fix the <code className="bg-blue-100 px-1 rounded">CreateBountyForm</code> component
          in <code className="bg-blue-100 px-1 rounded">src/components/create-bounty-form.tsx</code>
        </p>
      </div>
    </div>
  );
}
