/**
 * Bounty Discovery Algorithm - Advanced Scoring System
 * 
 * @author 小米粒 (PM + Dev Agent)
 * @version 2.0
 * @date 2026-03-28
 * 
 * ALGORITHM OVERVIEW:
 * This algorithm ranks bounties using a multi-factor scoring system that balances
 * reward attractiveness, funding reliability, competition level, freshness, and tag relevance.
 * 
 * SCORING FACTORS (Total: 0-100 points):
 * 1. Reward Amount (25 pts max) - Higher rewards attract more contributors
 * 2. Funding Progress (30 pts max) - Well-funded bounties are more likely to be paid
 * 3. Competition Level (20 pts max) - Lower competition = higher chance of success
 * 4. Recency (15 pts max) - Fresher bounties are more relevant
 * 5. Tag Relevance (10 pts max) - Popular tags indicate community interest
 * 
 * MATHEMATICAL MODEL:
 * - Exponential decay functions for competition and recency
 * - Min-max normalization for different scales
 * - Weighted sum with balanced coefficients
 */

/**
 * Configuration constants for the scoring algorithm
 * Adjust these to tune the ranking behavior
 */
const SCORING_CONFIG = {
  // Maximum expected reward for normalization ($1000)
  MAX_REWARD: 1000,
  
  // Decay rate for competition factor (higher = faster decay)
  COMPETITION_DECAY: 0.5,
  
  // Decay rate for recency factor (higher = faster decay)
  RECENCY_DECAY: 0.1,
  
  // Weight distribution (must sum to 100)
  WEIGHTS: {
    REWARD: 25,        // Reward amount weight
    FUNDING: 30,       // Funding progress weight
    COMPETITION: 20,   // Competition level weight (inverse)
    RECENCY: 15,       // Freshness weight
    TAGS: 10,          // Tag relevance weight
  },
  
  // Popular tags that boost score
  HOT_TAGS: ['auth', 'backend', 'performance', 'security', 'blockchain'],
};

/**
 * Normalizes a value to a 0-1 range
 */
function normalize(value: number, max: number): number {
  return Math.min(Math.max(value / max, 0), 1);
}

/**
 * Calculates exponential decay
 * Used for competition and recency factors
 */
function exponentialDecay(initialValue: number, decayRate: number, time: number): number {
  return initialValue * Math.exp(-decayRate * time);
}

/**
 * Main scoring function for bounties
 * 
 * @param bounty - Bounty object from mock data
 * @returns Total score (0-100)
 */
export function scoreBounty(bounty: {
  reward: number;
  fundedPercent: number;
  claimedCount: number;
  postedDaysAgo: number;
  tags: string[];
}): number {
  // 1. Reward Score (0-25 points)
  const rewardScore = normalize(bounty.reward, SCORING_CONFIG.MAX_REWARD) * SCORING_CONFIG.WEIGHTS.REWARD;
  
  // 2. Funding Score (0-30 points)
  const fundingScore = (bounty.fundedPercent / 100) * SCORING_CONFIG.WEIGHTS.FUNDING;
  
  // 3. Competition Score (0-20 points)
  // Fewer claims = less competition = better
  const competitionScore = exponentialDecay(
    SCORING_CONFIG.WEIGHTS.COMPETITION,
    SCORING_CONFIG.COMPETITION_DECAY,
    bounty.claimedCount
  );
  
  // 4. Recency Score (0-15 points)
  const recencyScore = exponentialDecay(
    SCORING_CONFIG.WEIGHTS.RECENCY,
    SCORING_CONFIG.RECENCY_DECAY,
    bounty.postedDaysAgo
  );
  
  // 5. Tag Score (0-10 points)
  const hotTagCount = bounty.tags.filter(tag => 
    SCORING_CONFIG.HOT_TAGS.includes(tag)
  ).length;
  const tagScore = normalize(hotTagCount, 2) * SCORING_CONFIG.WEIGHTS.TAGS;
  
  // Total score
  const totalScore = rewardScore + fundingScore + competitionScore + recencyScore + tagScore;
  
  return Math.round(totalScore * 10) / 10;
}

/**
 * Returns a detailed breakdown of the score
 */
export function getBountyScoreExplanation(bounty: {
  reward: number;
  fundedPercent: number;
  claimedCount: number;
  postedDaysAgo: number;
  tags: string[];
}): {
  total: number;
  breakdown: {
    reward: number;
    funding: number;
    competition: number;
    recency: number;
    tags: number;
  };
  details: string[];
} {
  const breakdown = {
    reward: Math.round(normalize(bounty.reward, SCORING_CONFIG.MAX_REWARD) * SCORING_CONFIG.WEIGHTS.REWARD * 10) / 10,
    funding: Math.round((bounty.fundedPercent / 100) * SCORING_CONFIG.WEIGHTS.FUNDING * 10) / 10,
    competition: Math.round(
      exponentialDecay(SCORING_CONFIG.WEIGHTS.COMPETITION, SCORING_CONFIG.COMPETITION_DECAY, bounty.claimedCount) * 10
    ) / 10,
    recency: Math.round(
      exponentialDecay(SCORING_CONFIG.WEIGHTS.RECENCY, SCORING_CONFIG.RECENCY_DECAY, bounty.postedDaysAgo) * 10
    ) / 10,
    tags: Math.round(
      normalize(bounty.tags.filter(t => SCORING_CONFIG.HOT_TAGS.includes(t)).length, 2) * SCORING_CONFIG.WEIGHTS.TAGS * 10
    ) / 10,
  };
  
  const details = [
    `Reward: $${bounty.reward} → ${breakdown.reward}pts (${SCORING_CONFIG.WEIGHTS.REWARD}pts max)`,
    `Funding: ${bounty.fundedPercent}% → ${breakdown.funding}pts (${SCORING_CONFIG.WEIGHTS.FUNDING}pts max)`,
    `Competition: ${bounty.claimedCount} claims → ${breakdown.competition}pts (inverse, ${SCORING_CONFIG.WEIGHTS.COMPETITION}pts max)`,
    `Recency: ${bounty.postedDaysAgo} days old → ${breakdown.recency}pts (${SCORING_CONFIG.WEIGHTS.RECENCY}pts max)`,
    `Tags: ${bounty.tags.filter(t => SCORING_CONFIG.HOT_TAGS.includes(t)).length} hot tags → ${breakdown.tags}pts (${SCORING_CONFIG.WEIGHTS.TAGS}pts max)`,
  ];
  
  return {
    total: Math.round((breakdown.reward + breakdown.funding + breakdown.competition + breakdown.recency + breakdown.tags) * 10) / 10,
    breakdown,
    details,
  };
}

/**
 * Sorts an array of bounties by score (highest first)
 */
export function rankBounties(bounties: any[]) {
  return bounties
    .map(bounty => ({
      ...bounty,
      score: scoreBounty(bounty),
    }))
    .sort((a, b) => b.score - a.score);
}
