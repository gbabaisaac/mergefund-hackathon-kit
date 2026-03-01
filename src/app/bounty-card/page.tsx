import { BountyCard } from "@/components/bounty-card";
import { mockBounties } from "@/data/mock-bounties";

export default function BountyCardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-br from-brand-50 to-white dark:from-slate-800 dark:to-slate-900">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Bounty Card Component
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl">
          A reusable, accessible, and responsive card component for displaying bounty information. 
          Features include progress tracking, difficulty badges, status indicators, and smooth hover animations.
        </p>
        
        {/* Features List */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["Responsive Design", "TypeScript", "Tailwind CSS", "Accessible", "Dark Mode"].map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center rounded-full bg-brand-100 dark:bg-brand-900/30 px-3 py-1 text-xs font-medium text-brand-700 dark:text-brand-300"
            >
              ✓ {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Component Showcase */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
          Component Examples
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {mockBounties.map((bounty) => (
            <BountyCard
              key={bounty.id}
              {...bounty}
              onClick={() => console.log(`Clicked: ${bounty.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Additional Examples with Status */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
          With Status Indicators
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BountyCard
            title="Implement OAuth2 Authentication"
            reward={500}
            tags={["backend", "security", "api"]}
            difficulty="Hard"
            progress={75}
            status="in-progress"
            description="Add OAuth2 authentication flow with support for Google, GitHub, and Twitter providers."
          />
          <BountyCard
            title="Design System Documentation"
            reward={200}
            tags={["design", "docs"]}
            difficulty="Easy"
            progress={100}
            status="completed"
            description="Create comprehensive documentation for the component library with usage examples."
          />
          <BountyCard
            title="Mobile App Push Notifications"
            reward={350}
            tags={["mobile", "ios", "android"]}
            difficulty="Medium"
            progress={0}
            status="open"
            description="Implement push notification support for both iOS and Android platforms."
          />
        </div>
      </section>

      {/* Usage Code Example */}
      <section className="card p-5 bg-slate-50 dark:bg-slate-800/50">
        <h2 className="text-lg font-semibold mb-3 text-slate-900 dark:text-slate-100">
          Usage Example
        </h2>
        <pre className="text-sm bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
          <code>{`import { BountyCard } from "@/components/bounty-card";

<BountyCard
  title="Fix mobile overflow on stats cards"
  reward={120}
  tags={["frontend", "ux", "bugfix"]}
  difficulty="Easy"
  progress={60}
  status="open"
  description="Optional description text"
  onClick={() => handleBountyClick()}
/>`}</code>
        </pre>
      </section>
    </div>
  );
}
