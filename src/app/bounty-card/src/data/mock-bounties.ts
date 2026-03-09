export const mockBounties = [
  {
    id: "bounty-1",
    title: "Fix mobile overflow on stats cards",
    reward: 120,
    tags: ["frontend", "ux", "bugfix"],
    difficulty: "Easy" as const,
    progress: 60,
  },
  {
    id: "bounty-2",
    title: "Add CSV export to leaderboard",
    reward: 250,
    tags: ["data", "dashboard"],
    difficulty: "Medium" as const,
    progress: 35,
  },
  {
    id: "bounty-3",
    title: "Improve bounty discovery ranking",
    reward: 400,
    tags: ["algorithm", "ranking"],
    difficulty: "Hard" as const,
    progress: 10,
  },
];
