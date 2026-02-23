import React from 'react';

interface BountyCardProps {
  title: string;
  reward: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number; // 0 to 100
}

const BountyCard: React.FC<BountyCardProps> = ({ 
  title, 
  reward, 
  tags, 
  difficulty, 
  progress 
}) => {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800 border-green-200',
    Intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    Advanced: 'bg-red-100 text-red-800 border-red-200',
  }[difficulty];

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col gap-4">
      {/* Header: Title & Difficulty */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight">
          {title}
        </h3>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>

      {/* Reward Amount */}
      <div className="flex items-baseline gap-1">
        <span className="text-gray-500 text-sm font-medium">Reward:</span>
        <span className="text-2xl font-extrabold text-indigo-600">{reward}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs font-medium border border-gray-100"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-gray-500">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm">
        View Details
      </button>
    </div>
  );
};

export default BountyCard;
