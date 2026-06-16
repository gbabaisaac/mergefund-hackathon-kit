"use client";

import { useMemo, useState } from "react";
import { mockSupportTickets, type SupportTicket } from "@/data/mock-support-tickets";

const priorityOrder = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
} satisfies Record<SupportTicket["priority"], number>;

const statusFilters = ["All", "Open", "Waiting", "Resolved"] as const;
const priorityFilters = ["All", "Critical", "High", "Medium", "Low"] as const;

type StatusFilter = typeof statusFilters[number];
type PriorityFilter = typeof priorityFilters[number];

function formatAge(hours: number) {
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  return `${Math.round(minutes / 60)}h`;
}

function isAtRisk(ticket: SupportTicket) {
  return ticket.status !== "Resolved" && ticket.lastReplyMinutesAgo > ticket.responseTargetMinutes;
}

function priorityClass(priority: SupportTicket["priority"]) {
  switch (priority) {
    case "Critical":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200";
    case "High":
      return "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200";
    case "Medium":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200";
    case "Low":
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200";
  }
}

function statusClass(status: SupportTicket["status"]) {
  switch (status) {
    case "Open":
      return "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200";
    case "Waiting":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200";
    case "Resolved":
      return "border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200";
  }
}

function scoreTicket(ticket: SupportTicket) {
  const slaPenalty = isAtRisk(ticket) ? 60 : (ticket.lastReplyMinutesAgo / ticket.responseTargetMinutes) * 20;
  const valueBoost = Math.min(ticket.accountValue / 1000, 40);
  const priorityBoost = (4 - priorityOrder[ticket.priority]) * 15;
  return Math.round(slaPenalty + valueBoost + priorityBoost);
}

export default function SupportTicketsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("All");
  const [sortMode, setSortMode] = useState("risk");
  const [selectedId, setSelectedId] = useState(mockSupportTickets[0].id);

  const tickets = useMemo(() => {
    return mockSupportTickets
      .filter((ticket) => statusFilter === "All" || ticket.status === statusFilter)
      .filter((ticket) => priorityFilter === "All" || ticket.priority === priorityFilter)
      .sort((a, b) => {
        if (sortMode === "priority") return priorityOrder[a.priority] - priorityOrder[b.priority];
        if (sortMode === "value") return b.accountValue - a.accountValue;
        if (sortMode === "newest") return a.createdHoursAgo - b.createdHoursAgo;
        return scoreTicket(b) - scoreTicket(a);
      });
  }, [priorityFilter, sortMode, statusFilter]);

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId) ?? tickets[0] ?? mockSupportTickets[0];
  const openTickets = mockSupportTickets.filter((ticket) => ticket.status !== "Resolved");
  const atRiskTickets = openTickets.filter(isAtRisk);
  const avgResponse = Math.round(openTickets.reduce((sum, ticket) => sum + ticket.lastReplyMinutesAgo, 0) / openTickets.length);
  const highValueQueue = openTickets.filter((ticket) => ticket.accountValue >= 7000).length;
  const channelCounts = mockSupportTickets.reduce<Record<string, number>>((acc, ticket) => {
    acc[ticket.channel] = (acc[ticket.channel] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-sm dark:border-slate-700">
        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
              Support operations
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Support Ticket Dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Prioritize customer issues by SLA risk, account value, owner, and support channel.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="text-xs font-medium text-slate-300">Open Queue</div>
                <div className="mt-2 text-2xl font-bold">{openTickets.length}</div>
              </div>
              <div className="rounded-2xl border border-red-300/20 bg-red-400/10 p-4">
                <div className="text-xs font-medium text-red-100">SLA Risk</div>
                <div className="mt-2 text-2xl font-bold">{atRiskTickets.length}</div>
              </div>
              <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4">
                <div className="text-xs font-medium text-blue-100">Avg Reply</div>
                <div className="mt-2 text-2xl font-bold">{formatMinutes(avgResponse)}</div>
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
                <div className="text-xs font-medium text-emerald-100">Key Accounts</div>
                <div className="mt-2 text-2xl font-bold">{highValueQueue}</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">Today</div>
                <div className="text-xs text-slate-300">Risk-weighted routing</div>
              </div>
              <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-emerald-950">Live mock</span>
            </div>
            <div className="mt-5 space-y-3">
              {atRiskTickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{ticket.id}</span>
                    <span className="text-xs text-red-200">{formatMinutes(ticket.lastReplyMinutesAgo)} waiting</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">{ticket.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  statusFilter === status
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Priority
              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value as PriorityFilter)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                {priorityFilters.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
              Sort
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="risk">Risk score</option>
                <option value="priority">Priority</option>
                <option value="value">Account value</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <button
              key={ticket.id}
              type="button"
              onClick={() => setSelectedId(ticket.id)}
              className={`w-full rounded-2xl border p-4 text-left transition ${
                selectedTicket.id === ticket.id
                  ? "border-brand-300 bg-brand-50 shadow-sm dark:border-brand-500/50 dark:bg-brand-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{ticket.id}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${priorityClass(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${statusClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                    {isAtRisk(ticket) && (
                      <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                        SLA breach
                      </span>
                    )}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-slate-950 dark:text-slate-100">{ticket.subject}</h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {ticket.customer} at {ticket.company}
                  </p>
                </div>
                <div className="flex gap-3 text-sm sm:text-right">
                  <div>
                    <div className="text-xs text-slate-500">Risk</div>
                    <div className="font-bold text-slate-950 dark:text-slate-100">{scoreTicket(ticket)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Value</div>
                    <div className="font-bold text-slate-950 dark:text-slate-100">${ticket.accountValue.toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                <span>Owner: {ticket.owner}</span>
                <span>Channel: {ticket.channel}</span>
                <span>Created: {formatAge(ticket.createdHoursAgo)}</span>
              </div>
            </button>
          ))}
        </div>

        <aside className="card h-fit p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {selectedTicket.id}
              </span>
              <h2 className="mt-2 text-2xl font-bold">{selectedTicket.subject}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{selectedTicket.summary}</p>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityClass(selectedTicket.priority)}`}>
              {selectedTicket.priority}
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Customer</div>
              <div className="mt-1 font-semibold">{selectedTicket.customer}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{selectedTicket.company}</div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-700/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">SLA target</div>
              <div className="mt-1 font-semibold">{formatMinutes(selectedTicket.responseTargetMinutes)}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Last reply {formatMinutes(selectedTicket.lastReplyMinutesAgo)} ago
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-950 dark:text-slate-100">Next action</h3>
            <p className="mt-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {selectedTicket.nextAction}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {selectedTicket.tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="card p-5 md:col-span-2">
          <h2 className="text-lg font-semibold">Workload by owner</h2>
          <div className="mt-4 space-y-3">
            {["Maya", "Ken", "Lina", "Owen"].map((owner) => {
              const count = openTickets.filter((ticket) => ticket.owner === owner).length;
              const width = `${Math.max(12, count * 26)}%`;
              return (
                <div key={owner}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{owner}</span>
                    <span className="text-slate-500">{count} open</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-2 rounded-full bg-brand-600" style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="text-lg font-semibold">Channel mix</h2>
          <div className="mt-4 space-y-3">
            {Object.entries(channelCounts).map(([channel, count]) => (
              <div key={channel} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-700/60">
                <span className="text-sm font-medium">{channel}</span>
                <span className="text-sm font-bold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
