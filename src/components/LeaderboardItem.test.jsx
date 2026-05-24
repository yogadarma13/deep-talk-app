/**
 * skenario testing
 *
 * - LeaderboardItem component
 *   - should content on component correct
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LeaderboardItem from './LeaderboardItem';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('LeaderboardItem component', () => {
  const leaderboard = {
    rank: 1,
    avatar: 'https://generated-image-url.jpg',
    name: 'User 1',
    score: 85,
  };
  it('should content on component correct', () => {
    render(<LeaderboardItem {...leaderboard} />);

    const rankElement = screen.getByTestId('rank-leaderboard');
    const avatarElement = screen.getByTestId('avatar-leaderboard');
    const nameElement = screen.getByTestId('name-leaderboard');
    const scoreElement = screen.getByTestId('score-leaderboard');

    expect(rankElement).toHaveTextContent(`#${leaderboard.rank}`);
    expect(avatarElement).toHaveAttribute('src', leaderboard.avatar);
    expect(nameElement).toHaveTextContent(leaderboard.name);
    expect(scoreElement).toHaveTextContent(leaderboard.score);
  });
});
