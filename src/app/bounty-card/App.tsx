import React from 'react';
import { BountyCard } from './components/BountyCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          Available Bounties
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 示例 1 - Easy */}
          <BountyCard
            title="Build a reusable Bounty Card component"
            reward={150}
            tags={['React', 'Tailwind CSS', 'UI']}
            difficulty="easy"
            progress={0}
          />

          {/* 示例 2 - Medium */}
          <BountyCard
            title="Implement discovery algorithm"
            reward={300}
            tags={['Algorithm', 'TypeScript', 'Backend']}
            difficulty="medium"
            progress={25}
            currency="USD"
          />

          {/* 示例 3 - Medium */}
          <BountyCard
            title="Create leaderboard page"
            reward={200}
            tags={['React', 'API Integration', 'Sorting']}
            difficulty="medium"
            progress={50}
          />

          {/* 示例 4 - Hard */}
          <BountyCard
            title="Add authentication system"
            reward={500}
            tags={['OAuth', 'Security', 'Backend']}
            difficulty="hard"
            progress={75}
          />

          {/* 示例 5 - Easy with EUR */}
          <BountyCard
            title="Design landing page"
            reward={120}
            tags={['UI/UX', 'Figma', 'CSS']}
            difficulty="easy"
            progress={100}
            currency="EUR"
          />

          {/* 示例 6 - Medium in progress */}
          <BountyCard
            title="Build notification system"
            reward={350}
            tags={['WebSocket', 'React', 'Real-time']}
            difficulty="medium"
            progress={60}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
