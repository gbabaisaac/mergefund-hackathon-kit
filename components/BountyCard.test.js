import { render, screen } from '@testing-library/react';
import BountyCard from './BountyCard';

test('renders bounty card with all elements', () => {
  render(<BountyCard title="Bug Fix" rewardAmount="$100" tags={['Frontend', 'High Priority']} difficulty="medium" progress={50} />);

  // Check if all required elements are present
  expect(screen.getByText('Bug Fix')).toBeInTheDocument();
  expect(screen.getByText('$100')).toBeInTheDocument();
  expect(screen.getByText('Frontend')).toBeInTheDocument();
  expect(screen.getByText('High Priority')).toBeInTheDocument();
  expect(screen.getByText('Difficulty:')).toBeInTheDocument();
  expect(screen.getByText('medium')).toBeInTheDocument();
  expect(screen.getByText('Progress')).toBeInTheDocument();
});