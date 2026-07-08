import type { BountyCardProps } from "@/components/bounty-card";

export const mockBounties: Array<BountyCardProps & { id: string }> = [
  {
    id: "bounty-1",
    title: "Fix mobile overflow on stats cards",
    reward: 120,
    tags: ["frontend", "ux", "bugfix"],
    difficulty: "Easy",
    progress: 60,
    description: "Resolve layout overflow on small screens and improve spacing around stats cards.",
    dueLabel: "Due in 3 days",
  },
  {
    id: "bounty-2",
    title: "Add CSV export to leaderboard",
    reward: 250,
    tags: ["data", "dashboard"],
    difficulty: "Medium",
    progress: 35,
    description: "Add an export flow for leaderboard data with clean table-friendly formatting.",
    dueLabel: "Due next week",
  },
  {
    id: "bounty-3",
    title: "Improve bounty discovery ranking",
    reward: 400,
    tags: ["algorithm", "ranking"],
    difficulty: "Hard",
    progress: 10,
    description: "Refine ranking signals and show how the final discovery score is calculated.",
    dueLabel: "Open for submissions",
  },
];
