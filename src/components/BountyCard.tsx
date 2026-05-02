
import React from 'react';

interface BountyCardProps {
  title: string;
  description: string;
  amount: number;
}

const BountyCard: React.FC<BountyCardProps> = ({ title, description, amount }) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <span className="text-gray-800 font-medium">${amount.toFixed(2)}</span>
    </div>
  );
};

export default BountyCard;
