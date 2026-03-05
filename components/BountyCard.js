import React from 'react';
import PropTypes from 'prop-types';

const BountyCard = ({ title, rewardAmount, tags, difficulty, progress }) => {
  return (
    <div className="max-w-sm w-full rounded-lg border p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="text-xl font-semibold mb-2">{title}</div>
      <div className="text-lg text-green-500 font-bold mb-4">{rewardAmount}</div>
      <div className="flex flex-wrap mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm mr-2 mb-2">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <span className="text-sm font-semibold text-gray-500 mr-2">Difficulty:</span>
        <span className={`inline-block py-1 px-3 text-sm rounded-full ${difficulty === 'easy' ? 'bg-green-200 text-green-800' : difficulty === 'medium' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{difficulty}</span>
      </div>
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Progress</div>
        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

BountyCard.propTypes = {
  title: PropTypes.string.isRequired,
  rewardAmount: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
  progress: PropTypes.number.isRequired,
};

export default BountyCard;