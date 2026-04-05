import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

export default function BountyCardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Bounty Card Component</h1>
        <p className="mt-1.5 text-slate-600 dark:text-slate-400">
          A reusable, responsive card component for displaying bounty details.
          Includes title, reward, tags, difficulty badge, and a progress bar.
        </p>
      </div>

      {/* Props table */}
      <div className="card p-5">
        <h2 className="text-base font-semibold mb-3">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-left">
                <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Prop</th>
                <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Type</th>
                <th className="pb-2 font-semibold text-slate-700 dark:text-slate-300">Description</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">title</td>
                <td className="py-2 font-mono text-xs">string</td>
                <td className="py-2">Bounty title</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">reward</td>
                <td className="py-2 font-mono text-xs">number</td>
                <td className="py-2">Reward amount in USD</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">tags</td>
                <td className="py-2 font-mono text-xs">string[]</td>
                <td className="py-2">Array of tag labels</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">difficulty</td>
                <td className="py-2 font-mono text-xs">Easy | Medium | Hard</td>
                <td className="py-2">Difficulty level badge</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">progress</td>
                <td className="py-2 font-mono text-xs">number (0–100)</td>
                <td className="py-2">Funding progress percentage</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">href</td>
                <td className="py-2 font-mono text-xs">string (optional)</td>
                <td className="py-2">Wraps card as a link</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-xs text-brand-600 dark:text-brand-400">onClick</td>
                <td className="py-2 font-mono text-xs">() =&gt; void (optional)</td>
                <td className="py-2">Click handler when not using href</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Desktop grid demo */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Desktop Layout</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          md: 2-column grid — hover to see lift & shadow effects
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {mockBounties.map((bounty) => (
            <BountyCard key={bounty.id} {...bounty} />
          ))}
        </div>
      </div>

      {/* Mobile single-column demo */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Mobile Layout</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Single column, compact padding — tap/hover to see hover effects
        </p>
        <div className="grid gap-3 sm:grid-cols-2 max-w-sm">
          {mockBounties.map((bounty) => (
            <BountyCard key={`mobile-${bounty.id}`} {...bounty} />
          ))}
        </div>
      </div>

      {/* Interactive demo with click handler */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Clickable Cards (with href)</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Cards can be rendered as links with a &quot;View details&quot; indicator on hover
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {mockBounties.map((bounty) => (
            <BountyCard
              key={`link-${bounty.id}`}
              {...bounty}
              href={`#bounty-${bounty.id}`}
            />
          ))}
        </div>
      </div>

      {/* Progress gradient showcase */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Progress Gradient States</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Progress bar colour changes based on funding stage
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <BountyCard
            title="Early stage bounty"
            reward={150}
            tags={["frontend"]}
            difficulty="Easy"
            progress={15}
          />
          <BountyCard
            title="Halfway funded"
            reward={300}
            tags={["backend", "api"]}
            difficulty="Medium"
            progress={55}
          />
          <BountyCard
            title="Almost there"
            reward={500}
            tags={["fullstack"]}
            difficulty="Hard"
            progress={78}
          />
          <BountyCard
            title="Fully funded"
            reward={1000}
            tags={["protocol", "defi"]}
            difficulty="Hard"
            progress={100}
          />
        </div>
      </div>

      {/* Feature checklist */}
      <div className="card p-5 space-y-2">
        <h2 className="text-base font-semibold mb-2">Feature Checklist</h2>
        {[
          "Reusable with typed props",
          "Responsive layout (mobile + desktop)",
          "Gradient progress bar by funding stage",
          "Hover lift &amp; shadow effects",
          "Dark mode support",
          "Difficulty badge with colour coding",
          "Clickable via href or onClick",
          "Accessible button fallback",
          "Tag pills with dark mode",
        ].map((feature) => (
          <div key={feature} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="text-green-500">✅</span>
            <span dangerouslySetInnerHTML={{ __html: feature }} />
          </div>
        ))}
      </div>
    </div>
  );
}
