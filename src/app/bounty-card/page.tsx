import BountyCard from '@/components/BountyCard';

export default function BountyCardPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bounty Card Component</h1>
          <p className="mt-2 text-lg text-gray-600">A reusable card for displaying bounty details with Tailwind CSS.</p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Component Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BountyCard 
              title="Implement GET /bounties/:id endpoint"
              reward="$100 USDC"
              tags={['api', 'backend', 'hono']}
              difficulty="Intermediate"
              progress={65}
            />
            
            <BountyCard 
              title="Fix Progress Bar Overflow Bug"
              reward="$50 USDC"
              tags={['bug', 'frontend', 'react']}
              difficulty="Beginner"
              progress={100}
            />

            <BountyCard 
              title="Autonomous Bounty Hunter Agent"
              reward="$500 USDC"
              tags={['ai', 'agent', 'python']}
              difficulty="Advanced"
              progress={15}
            />

            <BountyCard 
              title="Add Dark Mode Support to UI Kit"
              reward="$75 USDC"
              tags={['ui', 'tailwind', 'theme']}
              difficulty="Intermediate"
              progress={40}
            />
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">Built for MergeFund Hackathon Kit.</p>
        </footer>
      </div>
    </div>
  );
}
