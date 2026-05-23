import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DetailItem from './DetailItem';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('DetailItem component', () => {
  const thread = {
    userId: 'users-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerName: 'John Doe',
    ownerAvatar: 'https://generated-image-url.jpg',
    upVotesBy: ['user-2', 'user-3'],
    downVotesBy: ['user-4'],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2021-06-21T07:00:00.000Z',
      },
    ],
  };

  afterEach(() => {
    cleanup();
  });

  it('should content on component correct', () => {
    render(
      <DetailItem
        handleUpVote={() => {}}
        handleDownVote={() => {}}
        {...thread}
      />,
    );

    const categoryElement = screen.getByTestId('category-detail');
    const titleElement = screen.getByTestId('title-detail');
    const bodyElement = screen.getByTestId('body-detail');
    const dateElement = screen.getByTestId('date-detail');
    const ownerNameElement = screen.getByTestId('owner-name-detail');
    const ownerAvatarElement = screen.getByTestId('owner-avatar-detail');
    const commentsElement = screen.getByTestId('comments-item');
    const upVotesByElement = screen.getByTestId('upVotesBy-item');
    const downVotesByElement = screen.getByTestId('downVotesBy-item');

    expect(categoryElement).toHaveTextContent(`#${thread.category}`);
    expect(titleElement).toHaveTextContent(thread.title);
    expect(bodyElement).toHaveTextContent(thread.body);
    expect(dateElement).toHaveTextContent('21 Juni 2021');
    expect(ownerNameElement).toHaveTextContent(thread.ownerName);
    expect(ownerAvatarElement).toHaveAttribute('src', thread.ownerAvatar);
    expect(commentsElement).toHaveTextContent(thread.comments.length);
    expect(upVotesByElement).toHaveTextContent(thread.upVotesBy.length);
    expect(downVotesByElement).toHaveTextContent(thread.downVotesBy.length);
  });

  it('should call up vote function when up vote button is clicked', async () => {
    const mockHandleUpVote = vi.fn();
    render(
      <DetailItem
        handleUpVote={mockHandleUpVote}
        handleDownVote={() => {}}
        {...thread}
      />,
    );

    const upVotesByButton = screen.getByTestId('upVotesBy-button');

    await userEvent.click(upVotesByButton);

    expect(mockHandleUpVote).toHaveBeenCalled();
  });

  it('should call down vote function when down vote button is clicked', async () => {
    const mockHandleDownVote = vi.fn();
    render(
      <DetailItem
        handleUpVote={() => {}}
        handleDownVote={mockHandleDownVote}
        {...thread}
      />,
    );

    const downVotesByButton = screen.getByTestId('downVotesBy-button');

    await userEvent.click(downVotesByButton);

    expect(mockHandleDownVote).toHaveBeenCalled();
  });
});
