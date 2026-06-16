export type SupportTicket = {
  id: string;
  subject: string;
  customer: string;
  company: string;
  channel: "Email" | "Chat" | "Portal" | "Slack";
  status: "Open" | "Waiting" | "Resolved";
  priority: "Critical" | "High" | "Medium" | "Low";
  owner: "Maya" | "Ken" | "Lina" | "Owen";
  createdHoursAgo: number;
  lastReplyMinutesAgo: number;
  responseTargetMinutes: number;
  accountValue: number;
  summary: string;
  nextAction: string;
  tags: string[];
};

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "TCK-1048",
    subject: "Enterprise SSO callback fails after domain migration",
    customer: "Ari Morgan",
    company: "Northstar Labs",
    channel: "Slack",
    status: "Open",
    priority: "Critical",
    owner: "Maya",
    createdHoursAgo: 3,
    lastReplyMinutesAgo: 93,
    responseTargetMinutes: 45,
    accountValue: 18000,
    summary: "The customer moved to a new identity domain and cannot complete the SAML callback in production.",
    nextAction: "Confirm the ACS URL in the admin panel, then send the customer a tenant-specific metadata file and ask for one fresh login attempt.",
    tags: ["SSO", "Enterprise", "Authentication"],
  },
  {
    id: "TCK-1047",
    subject: "Usage export shows duplicate rows for archived workspaces",
    customer: "Jules Chen",
    company: "Pioneer Data",
    channel: "Portal",
    status: "Open",
    priority: "High",
    owner: "Ken",
    createdHoursAgo: 7,
    lastReplyMinutesAgo: 72,
    responseTargetMinutes: 90,
    accountValue: 9200,
    summary: "CSV exports include archived workspace events twice when the report covers more than one billing cycle.",
    nextAction: "Run the billing report against the latest export job and attach the deduped preview before escalating to engineering.",
    tags: ["Billing", "Exports", "Workspace"],
  },
  {
    id: "TCK-1046",
    subject: "Webhook retry queue stopped after endpoint timeout",
    customer: "Priya Nair",
    company: "Atlas Retail",
    channel: "Chat",
    status: "Waiting",
    priority: "Critical",
    owner: "Lina",
    createdHoursAgo: 11,
    lastReplyMinutesAgo: 138,
    responseTargetMinutes: 60,
    accountValue: 12500,
    summary: "Retry jobs paused after the customer's endpoint returned repeated 504 responses during a flash sale.",
    nextAction: "Share the retry window, confirm the new endpoint health check, and restart delivery from the failed event cursor.",
    tags: ["Webhooks", "Reliability", "Retail"],
  },
  {
    id: "TCK-1045",
    subject: "Dashboard cards load slowly for region-level managers",
    customer: "Mateo Silva",
    company: "BrightOps",
    channel: "Email",
    status: "Open",
    priority: "Medium",
    owner: "Owen",
    createdHoursAgo: 19,
    lastReplyMinutesAgo: 41,
    responseTargetMinutes: 120,
    accountValue: 4700,
    summary: "Managers with access to more than 80 locations see the dashboard skeleton for roughly seven seconds.",
    nextAction: "Ask for the region slug and test the new cached location rollup against the same permission set.",
    tags: ["Performance", "Dashboard", "Permissions"],
  },
  {
    id: "TCK-1044",
    subject: "Invoice contact cannot update tax ID from account settings",
    customer: "Elliot Park",
    company: "Lumen Grove",
    channel: "Portal",
    status: "Resolved",
    priority: "Low",
    owner: "Ken",
    createdHoursAgo: 34,
    lastReplyMinutesAgo: 18,
    responseTargetMinutes: 180,
    accountValue: 1800,
    summary: "A validation rule blocked tax IDs with a country prefix. The billing profile was updated manually.",
    nextAction: "No customer action pending. Watch the next invoice sync for the corrected tax ID.",
    tags: ["Billing", "Settings"],
  },
  {
    id: "TCK-1043",
    subject: "Mobile upload progress freezes on large PDF attachments",
    customer: "Sam Rivera",
    company: "Kite Legal",
    channel: "Email",
    status: "Waiting",
    priority: "High",
    owner: "Maya",
    createdHoursAgo: 28,
    lastReplyMinutesAgo: 166,
    responseTargetMinutes: 90,
    accountValue: 7600,
    summary: "Legal reviewers can upload small files, but large PDF attachments appear stuck at 99 percent on iOS Safari.",
    nextAction: "Request the affected file size range and confirm whether the signed upload URL expires before the final commit call.",
    tags: ["Mobile", "Uploads", "Legal"],
  },
];
