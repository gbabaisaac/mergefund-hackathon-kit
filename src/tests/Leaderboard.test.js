// Leaderboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Leaderboard from '../components/Leaderboard';

test('renders leaderboard table', () => {
  render(<Leaderboard />);
  expect(screen.getByText(/Alice/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Earned/i)).toBeInTheDocument();
  expect(screen.getByText(/Bounties Completed/i)).toBeInTheDocument();
  expect(screen.getByText(/Reputation Score/i)).toBeInTheDocument();
});

test('sorts by total earned', () => {
  render(<Leaderboard />);
  const sortButton = screen.getByText(/Total Earned/i);
  fireEvent.click(sortButton);
  const firstRowTotalEarned = screen.getByText(/2000/i).textContent;
  expect(firstRowTotalEarned).toBe('2000');
});
