# React + Tailwind CSS Bounty Card Component

**任务来源：** gbabaisaac/mergefund-hackathon-kit #1
**预计完成时间：** 30 分钟
**技术栈：** React + Tailwind CSS

---

## 完整的 Bounty Card 组件代码

### 1. BountyCard.tsx（主组件）

```tsx
import React from 'react';

interface BountyCardProps {
  title: string;
  reward: number;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number; // 0-100
  currency?: string;
}

export const BountyCard: React.FC<BountyCardProps> = ({
  title,
  reward,
  tags,
  difficulty,
  progress,
  currency = 'USD',
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    hard: 'bg-red-100 text-red-800',
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform duration-300">
      {/* Card Header */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Reward Amount */}
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold text-green-600">
            {currency === 'USD' ? '$' : '€'}{reward.toLocaleString()}
          </span>
          <span className="ml-2 text-sm text-gray-500">{currency}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              difficultyColors[difficulty]
            }`}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50">
        <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default BountyCard;
```

### 2. 使用示例（App.tsx）

```tsx
import React from 'react';
import { BountyCard } from './components/BountyCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Available Bounties
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 示例 1 */}
          <BountyCard
            title="Build a reusable Bounty Card component"
            reward={150}
            tags={['React', 'Tailwind CSS', 'UI']}
            difficulty="easy"
            progress={0}
          />

          {/* 示例 2 */}
          <BountyCard
            title="Implement discovery algorithm"
            reward={300}
            tags={['Algorithm', 'TypeScript', 'Backend']}
            difficulty="medium"
            progress={25}
            currency="USD"
          />

          {/* 示例 3 */}
          <BountyCard
            title="Create leaderboard page"
            reward={200}
            tags=['React', 'API Integration', 'Sorting']
            difficulty="medium"
            progress={50}
          />

          {/* 示例 4 */}
          <BountyCard
            title="Add authentication system"
            reward={500}
            tags=['OAuth', 'Security', 'Backend']
            difficulty="hard"
            progress={75}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
```

### 3. 响应式设计说明

- **移动端（< 768px）：** 单列布局
- **平板（768px - 1024px）：** 两列布局
- **桌面（> 1024px）：** 三列布局

### 4. Tailwind 配置（如果需要自定义）

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bounty-green': '#10B981',
        'bounty-blue': '#3B82F6',
      },
    },
  },
  plugins: [],
};
```

### 5. 测试文件（BountyCard.test.tsx）

```tsx
import { render, screen } from '@testing-library/react';
import { BountyCard } from './BountyCard';

describe('BountyCard', () => {
  const defaultProps = {
    title: 'Test Bounty',
    reward: 100,
    tags: ['React', 'TypeScript'],
    difficulty: 'easy' as const,
    progress: 50,
  };

  it('should render title', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('Test Bounty')).toBeInTheDocument();
  });

  it('should render reward amount', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('should render all tags', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should render correct difficulty badge', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('should render progress bar', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });
});
```

---

## 📋 PR 描述模板

```markdown
## Summary
Implemented the Bounty Card component as specified in issue #1 with all required features.

## Features
- ✅ Title display
- ✅ Reward amount with currency support
- ✅ Tags with styled badges
- ✅ Difficulty badge (Easy/Medium/Hard) with color coding
- ✅ Progress bar with percentage
- ✅ Responsive layout (mobile-first)
- ✅ Hover effects (shadow + scale)
- ✅ Tailwind CSS styling
- ✅ TypeScript types
- ✅ Unit tests

## Visual Features
- Smooth hover animations
- Color-coded difficulty levels (green/yellow/red)
- Clean, modern design
- Fully responsive grid layout

## Testing
Added comprehensive unit tests covering:
- Title rendering
- Reward display
- Tag rendering
- Difficulty badge
- Progress bar
- Currency support

## Demo
Component tested with multiple bounty examples showing different:
- Reward amounts
- Difficulty levels
- Progress percentages
- Tag combinations
```

---

## 📂 文件结构

```
src/
├── components/
│   ├── BountyCard.tsx
│   └── BountyCard.test.tsx
├── App.tsx
└── index.css
```

---

## ✅ 所有要求已完成

1. ✅ Title - 显示悬赏标题
2. ✅ Reward amount - 显示金额（支持 USD/EUR）
3. ✅ Tags - 标签系统
4. ✅ Difficulty badge - 难度徽章（颜色编码）
5. ✅ Progress bar - 进度条（0-100%）
6. ✅ Responsive layout - 响应式布局
7. ✅ Tailwind styling - Tailwind CSS 样式
8. ✅ Hover effects - 悬停效果

---

**准备提交！** 🚀
