import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BountyCard } from './BountyCard';

describe('BountyCard', () => {
  const defaultProps = {
    title: 'Build a reusable Bounty Card component',
    reward: 100,
    tags: ['React', 'TypeScript', 'UI'],
    difficulty: 'easy' as const,
    progress: 50,
    currency: 'USD' as const,
  };

  it('should render the title correctly', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('Build a reusable Bounty Card component')).toBeInTheDocument();
  });

  it('should render the reward amount with USD currency', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('should render the reward amount with EUR currency', () => {
    render(<BountyCard {...defaultProps} currency="EUR" />);
    expect(screen.getByText('€100')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
  });

  it('should render all tags', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('UI')).toBeInTheDocument();
  });

  it('should render difficulty badge for easy', () => {
    render(<BountyCard {...defaultProps} difficulty="easy" />);
    expect(screen.getByText('Easy')).toBeInTheDocument();
  });

  it('should render difficulty badge for medium', () => {
    render(<BountyCard {...defaultProps} difficulty="medium" />);
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('should render difficulty badge for hard', () => {
    render(<BountyCard {...defaultProps} difficulty="hard" />);
    expect(screen.getByText('Hard')).toBeInTheDocument();
  });

  it('should render progress percentage', () => {
    render(<BountyCard {...defaultProps} progress={75} />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should render progress label', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  it('should render View Details button', () => {
    render(<BountyCard {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'View Details' })).toBeInTheDocument();
  });

  it('should format large reward amounts correctly', () => {
    render(<BountyCard {...defaultProps} reward={1500} />);
    expect(screen.getByText('$1,500')).toBeInTheDocument();
  });

  it('should handle zero progress', () => {
    render(<BountyCard {...defaultProps} progress={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('should handle full progress', () => {
    render(<BountyCard {...defaultProps} progress={100} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  it('should render with custom currency symbol', () => {
    render(<BountyCard {...defaultProps} currency="EUR" reward={250} />);
    expect(screen.getByText('€250')).toBeInTheDocument();
  });
});
