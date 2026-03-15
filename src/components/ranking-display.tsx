import React from 'react';
import { BountyData, sortBounties } from '../features/ranking-system';

interface RankingDisplayProps {
  bounties: BountyData[];
}

const RankingDisplay: React.FC<RankingDisplayProps> = ({ bounties }) => {
  // Sort bounties based on the score
  const sortedBounties = sortBounties(bounties);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {sortedBounties.map(bounty => (
          <li key={bounty.id}>
            <div>
              <h3>{bounty.title}</h3>
              <p>Reward: ${bounty.reward}</p>
              <p>Difficulty: {bounty.difficulty}</p>
              <p>Progress: {bounty.progress}%</p>
              <p>Score: {bounty.score.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingDisplay;
