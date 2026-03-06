// Leaderboard.js
import React, { useState } from 'react';

const mockData = [
  { id: 1, name: 'Alice', totalEarned: 1200, bountiesCompleted: 10, reputationScore: 90 },
  { id: 2, name: 'Bob', totalEarned: 1500, bountiesCompleted: 15, reputationScore: 95 },
  { id: 3, name: 'Charlie', totalEarned: 1000, bountiesCompleted: 8, reputationScore: 85 },
  { id: 4, name: 'David', totalEarned: 2000, bountiesCompleted: 20, reputationScore: 98 }
];

const Leaderboard = () => {
  const [data, setData] = useState(mockData);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortData = (key) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return sortDirection === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="leaderboard">
      <table>
        <thead>
          <tr>
            <th onClick={() => sortData('name')}>Name</th>
            <th onClick={() => sortData('totalEarned')}>Total Earned</th>
            <th onClick={() => sortData('bountiesCompleted')}>Bounties Completed</th>
            <th onClick={() => sortData('reputationScore')}>Reputation Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.totalEarned}</td>
              <td>{user.bountiesCompleted}</td>
              <td>{user.reputationScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
