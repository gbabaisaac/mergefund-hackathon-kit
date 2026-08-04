export type HttpMethod = "GET" | "POST" | "PATCH";

export type ApiParameter = {
  name: string;
  value: string;
  location: "query" | "path";
  enabled: boolean;
};

export type ApiEndpoint = {
  id: string;
  group: "Bounties" | "Developers" | "Funding";
  method: HttpMethod;
  path: string;
  summary: string;
  description: string;
  parameters: ApiParameter[];
  requestBody?: string;
  status: number;
  timing: number;
  response: unknown;
};

export const mockApiEndpoints: ApiEndpoint[] = [
  {
    id: "list-bounties",
    group: "Bounties",
    method: "GET",
    path: "/v1/bounties",
    summary: "List bounties",
    description: "Returns funded, active bounties ordered by marketplace relevance.",
    parameters: [
      { name: "status", value: "funded", location: "query", enabled: true },
      { name: "limit", value: "20", location: "query", enabled: true },
      { name: "cursor", value: "", location: "query", enabled: false },
    ],
    status: 200,
    timing: 184,
    response: {
      data: [
        {
          id: "bnty_8f2a",
          title: "Build a public API explorer",
          reward: { amount: 10000, currency: "usd" },
          status: "funded",
          repository: "mergefund/hackathon-kit",
          tags: ["nextjs", "typescript", "tailwind"],
        },
        {
          id: "bnty_31ce",
          title: "Create an explainable discovery algorithm",
          reward: { amount: 10000, currency: "usd" },
          status: "funded",
          repository: "mergefund/hackathon-kit",
          tags: ["ranking", "frontend"],
        },
      ],
      next_cursor: "bnty_31ce",
      has_more: true,
    },
  },
  {
    id: "retrieve-bounty",
    group: "Bounties",
    method: "GET",
    path: "/v1/bounties/:bounty_id",
    summary: "Retrieve a bounty",
    description: "Retrieves one bounty, including its funding and claim state.",
    parameters: [
      { name: "bounty_id", value: "bnty_8f2a", location: "path", enabled: true },
    ],
    status: 200,
    timing: 96,
    response: {
      id: "bnty_8f2a",
      title: "Build a public API explorer",
      status: "funded",
      funded_percent: 100,
      claims_count: 3,
      created_at: "2026-07-28T14:22:18Z",
    },
  },
  {
    id: "create-bounty",
    group: "Bounties",
    method: "POST",
    path: "/v1/bounties",
    summary: "Create a bounty",
    description: "Creates a draft bounty connected to a repository issue.",
    parameters: [],
    requestBody: `{
  "repository": "acme/launchpad",
  "issue_number": 42,
  "reward_amount": 25000,
  "currency": "usd"
}`,
    status: 201,
    timing: 243,
    response: {
      id: "bnty_b4d1",
      status: "draft",
      checkout_url: "https://pay.mergefund.dev/bnty_b4d1",
      created_at: "2026-08-04T16:08:12Z",
    },
  },
  {
    id: "list-developers",
    group: "Developers",
    method: "GET",
    path: "/v1/developers",
    summary: "List developers",
    description: "Returns public contributor profiles with verified reputation data.",
    parameters: [
      { name: "skill", value: "typescript", location: "query", enabled: true },
      { name: "available", value: "true", location: "query", enabled: true },
    ],
    status: 200,
    timing: 132,
    response: {
      data: [
        { id: "dev_91a", handle: "nova", reputation: 982, earned: 12400 },
        { id: "dev_16c", handle: "bytepilot", reputation: 947, earned: 8750 },
      ],
      total: 2,
    },
  },
  {
    id: "leaderboard",
    group: "Developers",
    method: "GET",
    path: "/v1/leaderboard",
    summary: "Get leaderboard",
    description: "Returns ranked developer performance for the selected time window.",
    parameters: [
      { name: "period", value: "30d", location: "query", enabled: true },
    ],
    status: 200,
    timing: 109,
    response: {
      period: "30d",
      data: [
        { rank: 1, handle: "nova", completed: 12, earned: 4200 },
        { rank: 2, handle: "bytepilot", completed: 9, earned: 3650 },
      ],
    },
  },
  {
    id: "create-funding-intent",
    group: "Funding",
    method: "POST",
    path: "/v1/funding-intents",
    summary: "Create funding intent",
    description: "Creates a secure checkout session for funding a draft bounty.",
    parameters: [],
    requestBody: `{
  "bounty_id": "bnty_b4d1",
  "amount": 25000,
  "success_url": "https://acme.dev/funded"
}`,
    status: 201,
    timing: 218,
    response: {
      id: "fi_7ca2",
      status: "requires_payment",
      amount: 25000,
      checkout_url: "https://pay.mergefund.dev/fi_7ca2",
      expires_at: "2026-08-04T16:38:12Z",
    },
  },
];
