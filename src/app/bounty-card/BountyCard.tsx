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

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };

  const symbol = currencySymbols[currency] || currency;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform duration-300">
      {/* Card Header */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Reward Amount */}
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold text-green-600">
            {symbol}{reward.toLocaleString()}
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
