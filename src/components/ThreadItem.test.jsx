/**
 * skenario testing
 *
 * - ThreadItem component
 *   - should content on component correct
 *   - should call up vote function when up vote button is clicked
 *   - should call down vote function when down vote button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ThreadItem from './ThreadItem';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('ThreadItem component', () => {
  const thread = {
    userId: 'user-1',
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: ['user-2'],
    totalComments: 0,
    user: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  };

  afterEach(() => {
    cleanup();
  });

  it('should content on component correct', () => {
    render(
      <MemoryRouter>
        <ThreadItem
          handleUpVote={() => {}}
          handleDownVote={() => {}}
          {...thread}
        />
      </MemoryRouter>,
    );

    const categoryElement = screen.getByTestId('category-thread-item');
    const titleElement = screen.getByTestId('title-thread-item');
    const bodyElement = screen.getByTestId('body-thread-item');
    const dateElement = screen.getByTestId('date-thread-item');
    const ownerNameElement = screen.getByTestId('ownerName-thread-item');
    const ownerAvatarElement = screen.getByTestId('ownerAvatar-thread-item');
    const commentsElement = screen.getByTestId('comments-item');
    const upVotesByElement = screen.getByTestId('upVotesBy-item');
    const downVotesByElement = screen.getByTestId('downVotesBy-item');

    expect(categoryElement).toHaveTextContent(`#${thread.category}`);
    expect(titleElement).toHaveTextContent(thread.title);
    expect(bodyElement).toHaveTextContent(thread.body);
    expect(dateElement).toHaveTextContent('21 Juni 2021');
    expect(ownerNameElement).toHaveTextContent(thread.user.name);
    expect(ownerAvatarElement).toHaveAttribute('src', thread.user.avatar);
    expect(commentsElement).toHaveTextContent(thread.totalComments);
    expect(upVotesByElement).toHaveTextContent(thread.upVotesBy.length);
    expect(downVotesByElement).toHaveTextContent(thread.downVotesBy.length);
  });

  it('should call up vote function when up vote button is clicked', async () => {
    const mockHandleUpVote = vi.fn();
    render(
      <MemoryRouter>
        <ThreadItem
          handleUpVote={mockHandleUpVote}
          handleDownVote={() => {}}
          {...thread}
        />
      </MemoryRouter>,
    );

    const upVotesByButton = screen.getByTestId('upVotesBy-button');

    await userEvent.click(upVotesByButton);

    expect(mockHandleUpVote).toHaveBeenCalled();
  });

  it('should call down vote function when down vote button is clicked', async () => {
    const mockHandleDownVote = vi.fn();
    render(
      <MemoryRouter>
        <ThreadItem
          handleUpVote={() => {}}
          handleDownVote={mockHandleDownVote}
          {...thread}
        />
      </MemoryRouter>,
    );

    const downVotesByButton = screen.getByTestId('downVotesBy-button');

    await userEvent.click(downVotesByButton);

    expect(mockHandleDownVote).toHaveBeenCalled();
  });
});
