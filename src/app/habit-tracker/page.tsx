"use client";

import { useState } from "react";

// Mock data for habit tracking
const initialHabits = [
  {
    id: "h1",
    name: "Morning Exercise",
    icon: "🏃",
    frequency: "daily" as const,
    streak: 12,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    targetDays: 30,
  },
  {
    id: "h2",
    name: "Read 30 minutes",
    icon: "📚",
    frequency: "daily" as const,
    streak: 5,
    completedDays: [8, 9, 10, 11, 12],
    targetDays: 30,
  },
  {
    id: "h3",
    name: "Meditation",
    icon: "🧘",
    frequency: "daily" as const,
    streak: 21,
    completedDays: Array.from({ length: 21 }, (_, i) => i + 1),
    targetDays: 30,
  },
  {
    id: "h4",
    name: "Learn TypeScript",
    icon: "💻",
    frequency: "weekly" as const,
    streak: 3,
    completedDays: [1, 2, 3],
    targetDays: 12,
  },
];

const today = 12; // Mock current day of month

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState(initialHabits);

  const toggleHabit = (habitId: string) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id !== habitId) return habit;

        const isCompleted = habit.completedDays.includes(today);
        let newCompletedDays: number[];
        let newStreak: number;

        if (isCompleted) {
          // Uncomplete for today
          newCompletedDays = habit.completedDays.filter((d) => d !== today);
          newStreak = Math.max(0, habit.streak - 1);
        } else {
          // Complete for today
          newCompletedDays = [...habit.completedDays, today].sort((a, b) => a - b);
          newStreak = habit.streak + 1;
        }

        return {
          ...habit,
          completedDays: newCompletedDays,
          streak: newStreak,
        };
      })
    );
  };

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const completedToday = habits.filter((h) => h.completedDays.includes(today)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <h1 className="text-2xl font-semibold">Habit Tracker</h1>
        <p className="text-slate-600 mt-2">
          Track your daily habits and build streaks to stay motivated.
        </p>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{habits.length}</div>
            <div className="text-sm text-slate-600">Active Habits</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{totalStreak}</div>
            <div className="text-sm text-slate-600">Total Streak Days</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">
              {completedToday}/{habits.length}
            </div>
            <div className="text-sm text-slate-600">Completed Today</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((completedToday / habits.length) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Daily Progress</div>
          </div>
        </div>
      </div>

      {/* Habit List */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            isCompletedToday={habit.completedDays.includes(today)}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="card p-4">
        <h3 className="font-semibold mb-2">How it works</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• Click a habit card to mark it complete for today</li>
          <li>• Streaks count consecutive days of completion</li>
          <li>• Progress bars show your journey towards monthly goals</li>
          <li>• Try to maintain all streaks to build lasting habits!</li>
        </ul>
      </div>
    </div>
  );
}

interface Habit {
  id: string;
  name: string;
  icon: string;
  frequency: "daily" | "weekly";
  streak: number;
  completedDays: number[];
  targetDays: number;
}

function HabitCard({
  habit,
  isCompletedToday,
  onToggle,
}: {
  habit: Habit;
  isCompletedToday: boolean;
  onToggle: () => void;
}) {
  const progress = (habit.completedDays.length / habit.targetDays) * 100;

  return (
    <div
      className={`card p-5 cursor-pointer transition-all ${
        isCompletedToday
          ? "bg-green-50 border-green-200"
          : "hover:border-brand-200 hover:bg-slate-50"
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
              isCompletedToday
                ? "bg-green-500 text-white"
                : "bg-slate-200 text-slate-400"
            }`}
          >
            {isCompletedToday ? "✓" : habit.icon}
          </div>

          {/* Habit Info */}
          <div>
            <h3 className="font-semibold text-lg">{habit.name}</h3>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="capitalize">{habit.frequency}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                🔥 <span className="font-medium text-orange-500">{habit.streak}</span> day streak
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="text-right">
          <div className="text-sm text-slate-500">
            {habit.completedDays.length}/{habit.targetDays} days
          </div>
          <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full rounded-full transition-all ${
                progress >= 80
                  ? "bg-green-500"
                  : progress >= 50
                  ? "bg-blue-500"
                  : "bg-amber-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Streak Badge */}
      {habit.streak >= 7 && (
        <div className="mt-3 flex gap-2">
          {habit.streak >= 21 && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
              🏆 3 Week Champion
            </span>
          )}
          {habit.streak >= 14 && habit.streak < 21 && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              ⭐ 2 Week Achiever
            </span>
          )}
          {habit.streak >= 7 && habit.streak < 14 && (
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              🌟 1 Week Warrior
            </span>
          )}
        </div>
      )}
    </div>
  );
}
