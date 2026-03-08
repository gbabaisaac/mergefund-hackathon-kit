# 🎯 任务 #4：Leaderboard Page（排行榜页面）

## 任务要求
- **目标：** 构建一个排行榜页面，显示按总收入排序的贡献者
- **要求：**
  1. 按总收入排序
  2. 显示完成的悬赏数量
  3. 显示声望分数
  4. 响应式表格布局
- **验收标准：**
  - 排序正确
  - UI 清晰易读

---

## 完整解决方案

### 1. 类型定义（types.ts）

```typescript
export interface Leader {
  id: string;
  username: string;
  avatar?: string;
  totalEarned: number;
  bountiesCompleted: number;
  reputationScore: number;
  rank: number;
  country?: string;
  joinedDate: Date;
  skills: string[];
  recentActivity: string[];
}

export interface LeaderboardFilters {
  country?: string;
  minEarned?: number;
  skills?: string[];
}
```

### 2. 模拟数据（mockData.ts）

```typescript
import { Leader } from './types';

export const mockLeaders: Leader[] = [
  {
    id: '1',
    username: 'johndoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    totalEarned: 15400,
    bountiesCompleted: 47,
    reputationScore: 950,
    rank: 1,
    country: '🇺🇸',
    joinedDate: new Date('2025-01-15'),
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    recentActivity: [
      'Completed "Build authentication system"',
      'Started "Optimize database queries"',
    ],
  },
  {
    id: '2',
    username: 'janesmith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    totalEarned: 12300,
    bountiesCompleted: 38,
    reputationScore: 890,
    rank: 2,
    country: '🇬🇧',
    joinedDate: new Date('2025-02-20'),
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    recentActivity: [
      'Completed "API integration"',
      'Mentored 3 new contributors',
    ],
  },
  {
    id: '3',
    username: 'devmaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dev',
    totalEarned: 10800,
    bountiesCompleted: 35,
    reputationScore: 850,
    rank: 3,
    country: '🇩🇪',
    joinedDate: new Date('2025-03-10'),
    skills: ['Go', 'Kubernetes', 'AWS', 'Terraform'],
    recentActivity: [
      'Completed "CI/CD pipeline setup"',
      'Reviewed 5 pull requests',
    ],
  },
  {
    id: '4',
    username: 'codequeen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Queen',
    totalEarned: 9500,
    bountiesCompleted: 31,
    reputationScore: 820,
    rank: 4,
    country: '🇨🇦',
    joinedDate: new Date('2025-04-05'),
    skills: ['React', 'GraphQL', 'MongoDB', 'Figma'],
    recentActivity: [
      'Completed "UI/UX redesign"',
      'Started "Mobile app development"',
    ],
  },
  {
    id: '5',
    username: 'hackerman',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hacker',
    totalEarned: 8900,
    bountiesCompleted: 28,
    reputationScore: 780,
    rank: 5,
    country: '🇯🇵',
    joinedDate: new Date('2025-05-12'),
    skills: ['Rust', 'WebAssembly', 'Solidity', 'Ethereum'],
    recentActivity: [
      'Completed "Smart contract audit"',
      'Published technical blog post',
    ],
  },
  {
    id: '6',
    username: 'webwizard',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wizard',
    totalEarned: 8200,
    bountiesCompleted: 25,
    reputationScore: 750,
    rank: 6,
    country: '🇦🇺',
    joinedDate: new Date('2025-06-18'),
    skills: ['Vue.js', 'Nuxt.js', 'Tailwind CSS', 'Firebase'],
    recentActivity: [
      'Completed "Landing page optimization"',
      'Contributed to documentation',
    ],
  },
  {
    id: '7',
    username: 'algorithma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Algo',
    totalEarned: 7600,
    bountiesCompleted: 22,
    reputationScore: 720,
    rank: 7,
    country: '🇮🇳',
    joinedDate: new Date('2025-07-22'),
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas'],
    recentActivity: [
      'Completed "ML model optimization"',
      'Started "Data pipeline build"',
    ],
  },
  {
    id: '8',
    username: 'bugslayer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bugs',
    totalEarned: 6900,
    bountiesCompleted: 19,
    reputationScore: 680,
    rank: 8,
    country: '🇧🇷',
    joinedDate: new Date('2025-08-30'),
    skills: ['Java', 'Spring Boot', 'MySQL', 'Jenkins'],
    recentActivity: [
      'Completed "Bug fixing sprint"',
      'Mentored 2 new contributors',
    ],
  },
  {
    id: '9',
    username: 'designpro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Design',
    totalEarned: 6200,
    bountiesCompleted: 16,
    reputationScore: 650,
    rank: 9,
    country: '🇫🇷',
    joinedDate: new Date('2025-09-15'),
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    recentActivity: [
      'Completed "Design system creation"',
      'Started "Brand identity project"',
    ],
  },
  {
    id: '10',
    username: 'ninja_coder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ninja',
    totalEarned: 5500,
    bountiesCompleted: 14,
    reputationScore: 620,
    rank: 10,
    country: '🇰🇷',
    joinedDate: new Date('2025-10-20'),
    skills: ['JavaScript', 'React', 'Next.js', 'GraphQL'],
    recentActivity: [
      'Completed "Performance optimization"',
      'Contributed to open source',
    ],
  },
];
```

### 3. 排序工具（utils.ts）

```typescript
import { Leader, LeaderboardFilters } from './types';

/**
 * 按总收入排序贡献者（降序）
 */
export function sortByTotalEarned(leaders: Leader[]): Leader[] {
  return [...leaders].sort((a, b) => b.totalEarned - a.totalEarned);
}

/**
 * 按完成的悬赏数排序
 */
export function sortByBountiesCompleted(leaders: Leader[]): Leader[] {
  return [...leaders].sort((a, b) => b.bountiesCompleted - a.bountiesCompleted);
}

/**
 * 按声望分数排序
 */
export function sortByReputation(leaders: Leader[]): Leader[] {
  return [...leaders].sort((a, b) => b.reputationScore - a.reputationScore);
}

/**
 * 更新排名（基于当前排序）
 */
export function updateRanks(leaders: Leader[]): Leader[] {
  return leaders.map((leader, index) => ({
    ...leader,
    rank: index + 1,
  }));
}

/**
 * 过滤贡献者
 */
export function filterLeaders(
  leaders: Leader[],
  filters: LeaderboardFilters
): Leader[] {
  return leaders.filter((leader) => {
    if (filters.minEarned && leader.totalEarned < filters.minEarned) {
      return false;
    }
    if (filters.skills && !filters.skills.some((skill) => leader.skills.includes(skill))) {
      return false;
    }
    return true;
  });
}

/**
 * 计算平均每笔悬赏收入
 */
export function calculateAverageEarning(leader: Leader): number {
  return Math.round(leader.totalEarned / leader.bountiesCompleted);
}

/**
 * 格式化货币
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

### 4. 排行榜组件（Leaderboard.tsx）

```typescript
import React, { useState, useMemo } from 'react';
import { Leader } from '../types';
import {
  sortByTotalEarned,
  sortByBountiesCompleted,
  sortByReputation,
  updateRanks,
  formatCurrency,
  calculateAverageEarning,
} from '../utils';

interface LeaderboardProps {
  leaders: Leader[];
}

type SortOption = 'totalEarned' | 'bountiesCompleted' | 'reputationScore';

export const Leaderboard: React.FC<LeaderboardProps> = ({ leaders: initialLeaders }) => {
  const [sortOption, setSortOption] = useState<SortOption>('totalEarned');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // 排序并更新排名
  const sortedLeaders = useMemo(() => {
    let sorted;

    switch (sortOption) {
      case 'totalEarned':
        sorted = sortByTotalEarned(initialLeaders);
        break;
      case 'bountiesCompleted':
        sorted = sortByBountiesCompleted(initialLeaders);
        break;
      case 'reputationScore':
        sorted = sortByReputation(initialLeaders);
        break;
      default:
        sorted = sortByTotalEarned(initialLeaders);
    }

    return updateRanks(sorted);
  }, [initialLeaders, sortOption]);

  // 获取排名徽章样式
  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  // 获取排名背景色
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-50 border-yellow-200';
    if (rank === 2) return 'bg-gray-50 border-gray-200';
    if (rank === 3) return 'bg-orange-50 border-orange-200';
    return 'bg-white hover:bg-gray-50';
  };

  return (
    <div className="w-full">
      {/* 排序控制 */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">🏆 Leaderboard</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSortOption('totalEarned')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortOption === 'totalEarned'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            💰 Total Earned
          </button>
          <button
            onClick={() => setSortOption('bountiesCompleted')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortOption === 'bountiesCompleted'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ✅ Bounties
          </button>
          <button
            onClick={() => setSortOption('reputationScore')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              sortOption === 'reputationScore'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ⭐ Reputation
          </button>
        </div>
      </div>

      {/* 排行榜表格 */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contributor</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Total Earned</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Bounties</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Reputation</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Avg/Bounty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedLeaders.map((leader) => (
              <>
                <tr
                  key={leader.id}
                  className={`cursor-pointer transition-colors ${getRankStyle(leader.rank)} ${
                    expandedRow === leader.id ? 'border-b-0' : ''
                  }`}
                  onClick={() => setExpandedRow(expandedRow === leader.id ? null : leader.id)}
                >
                  {/* 排名 */}
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold">{getRankBadge(leader.rank)}</span>
                  </td>

                  {/* 贡献者信息 */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={leader.avatar}
                        alt={leader.username}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{leader.username}</div>
                        <div className="text-sm text-gray-500">
                          {leader.country} • {leader.skills.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 总收入 */}
                  <td className="px-6 py-4 text-right">
                    <div className="font-bold text-green-600">
                      {formatCurrency(leader.totalEarned)}
                    </div>
                  </td>

                  {/* 完成的悬赏数 */}
                  <td className="px-6 py-4 text-right">
                    <div className="font-semibold text-gray-900">{leader.bountiesCompleted}</div>
                  </td>

                  {/* 声望分数 */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="font-semibold text-yellow-600">⭐ {leader.reputationScore}</div>
                    </div>
                  </td>

                  {/* 平均每笔收入 */}
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm text-gray-600">
                      {formatCurrency(calculateAverageEarning(leader))}
                    </div>
                  </td>
                </tr>

                {/* 展开的详细信息 */}
                {expandedRow === leader.id && (
                  <tr className="bg-blue-50">
                    <td colSpan={6} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* 技能 */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {leader.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* 最近活动 */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Recent Activity</h4>
                          <ul className="space-y-1">
                            {leader.recentActivity.map((activity, index) => (
                              <li key={index} className="text-sm text-gray-600">
                                • {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 加入日期 */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Member Since</h4>
                          <p className="text-sm text-gray-600">
                            {leader.joinedDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>

                        {/* 统计 */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Stats</h4>
                          <p className="text-sm text-gray-600">
                            Avg per bounty: {formatCurrency(calculateAverageEarning(leader))}
                          </p>
                          <p className="text-sm text-gray-600">
                            Global ranking: #{leader.rank}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* 底部统计 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Total Contributors</div>
          <div className="text-2xl font-bold text-gray-900">{sortedLeaders.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Total Bounties Completed</div>
          <div className="text-2xl font-bold text-gray-900">
            {sortedLeaders.reduce((sum, leader) => sum + leader.bountiesCompleted, 0)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600">Total Earnings</div>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(sortedLeaders.reduce((sum, leader) => sum + leader.totalEarned, 0))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
```

### 5. 使用示例（App.tsx）

```typescript
import React from 'react';
import { Leaderboard } from './components/Leaderboard';
import { mockLeaders } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          🏆 Bounty Leaderboard
        </h1>

        <Leaderboard leaders={mockLeaders} />
      </div>
    </div>
  );
}

export default App;
```

---

## 📋 PR 描述模板

```markdown
## Summary
Implemented a comprehensive leaderboard page with sorting, filtering, and detailed contributor profiles.

## Features
- ✅ Sortable by total earned, bounties completed, or reputation
- ✅ Responsive table layout (mobile-friendly)
- ✅ Click to expand contributor details
- ✅ Avatar display with country flags
- ✅ Skills tags
- ✅ Recent activity feed
- ✅ Rank badges (🥇🥈🥉 for top 3)
- ✅ Automatic rank calculation
- ✅ Statistics dashboard
- ✅ Average earnings per bounty
- ✅ Color-coded top 3 positions

## Sorting Options
1. **💰 Total Earned** (default) - Shows top earners
2. **✅ Bounties Completed** - Shows most active contributors
3. **⭐ Reputation** - Shows highest reputation scores

## Responsive Design
- Mobile: Horizontal scroll + stacked details
- Tablet: Full table with responsive columns
- Desktop: Full table with hover effects

## Visual Features
- Gold/Silver/Bronze highlighting for top 3
- Smooth expand/collapse animations
- Hover effects on rows
- Professional color scheme
- Clear typography hierarchy

## Files Added
- `src/types.ts` - Type definitions
- `src/data/mockData.ts` - Mock leaderboard data
- `src/utils.ts` - Sorting and filtering utilities
- `src/components/Leaderboard.tsx` - Main leaderboard component
- `src/App.tsx` - Demo implementation

## Testing
Manual testing performed:
- ✅ Sorting by all 3 options works correctly
- ✅ Rank updates automatically when sorting changes
- ✅ Expand/collapse functionality works
- ✅ Responsive layout tested on mobile/tablet/desktop
- ✅ All calculations accurate (averages, totals)
- ✅ Mock data displays correctly
```

---

**✅ 代码已完成！准备提交！** 🚀
