import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

export default function BountyCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Bounty Card Component</h1>
        <p className="text-slate-600">
          Build and refine the bounty card UI component. Use the mock data below.
        </p>
      </div>

      {/* Desktop View */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-slate-800">Desktop View</h2>
        <div className="hidden md:block border border-slate-200 rounded-xl p-6 bg-slate-50">
          <div className="grid gap-4 md:grid-cols-2">
            {mockBounties.map((bounty) => (
              <BountyCard key={`${bounty.id}-desktop`} {...bounty} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-slate-800">Mobile View</h2>
        <div className="md:hidden border border-slate-200 rounded-xl p-4 bg-slate-50">
          <div className="space-y-4 max-w-sm mx-auto">
            {mockBounties.map((bounty) => (
              <BountyCard key={`${bounty.id}-mobile`} {...bounty} />
            ))}
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-2 md:hidden">
          Scroll horizontally or zoom out to see all cards in mobile view.
        </p>
      </div>

      {/* Props Documentation */}
      <div className="border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4 text-slate-800">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Prop</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Type</th>
                <th className="text-left py-2 px-3 font-semibold text-slate-700">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3 font-mono text-xs text-brand-700">title</td>
                <td className="py-2 px-3 font-mono text-xs text-slate-600">string</td>
                <td className="py-2 px-3 text-slate-600">Bounty title</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3 font-mono text-xs text-brand-700">reward</td>
                <td className="py-2 px-3 font-mono text-xs text-slate-600">number</td>
                <td className="py-2 px-3 text-slate-600">Reward amount in USD</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3 font-mono text-xs text-brand-700">tags</td>
                <td className="py-2 px-3 font-mono text-xs text-slate-600">string[]</td>
                <td className="py-2 px-3 text-slate-600">Array of tag labels</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 px-3 font-mono text-xs text-brand-700">difficulty</td>
                <td className="py-2 px-3 font-mono text-xs text-slate-600">&quot;Easy&quot; | &quot;Medium&quot; | &quot;Hard&quot;</td>
                <td className="py-2 px-3 text-slate-600">Difficulty level badge</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono text-xs text-brand-700">progress</td>
                <td className="py-2 px-3 font-mono text-xs text-slate-600">number</td>
                <td className="py-2 px-3 text-slate-600">Progress percentage (0–100)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
