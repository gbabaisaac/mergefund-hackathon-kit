// This module provides a ranking algorithm to score and sort mock data based on predefined criteria.

// Define the structure of the data to be scored
export interface BountyData {
  id: string;
  title: string;
  reward: number;
  difficulty: number;
  progress: number;
  tags: string[];
}

// Score the bounty data based on reward, difficulty, and progress
function calculateScore(bounty: BountyData): number {
  // Reward has the highest weight, followed by progress and difficulty
  const rewardScore = bounty.reward * 0.5;
  const progressScore = bounty.progress * 0.3;
  const difficultyScore = (1 / bounty.difficulty) * 0.2;

  // Return total score
  return rewardScore + progressScore + difficultyScore;
}

// Sort bounties by their calculated score in descending order
export function sortBounties(bounties: BountyData[]): BountyData[] {
  // Calculate score for each bounty
  const bountiesWithScore = bounties.map(bounty => ({...bounty, score: calculateScore(bounty)}));

  // Sort bounties by score in descending order
  bountiesWithScore.sort((a, b) => b.score - a.score);

  // Return sorted bounties
  return bountiesWithScore.map(bounty => ({ id: bounty.id, title: bounty.title, reward: bounty.reward, difficulty: bounty.difficulty, progress: bounty.progress, tags: bounty.tags, score: bounty.score }));
}
