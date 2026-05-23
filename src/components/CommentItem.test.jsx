import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentItem from './CommentItem';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('CommentItem component', () => {
  const comment = {
    userId: 'user-1',
    id: 'comment-1',
    content: 'Ini adalah komentar pertama',
    createdAt: '2021-06-21T07:00:00.000Z',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
    upVotesBy: ['user-2'],
    downVotesBy: ['user-3'],
  };

  afterEach(() => {
    cleanup();
  });

  it('should content on component correct', () => {
    render(
      <CommentItem
        handleUpVote={() => {}}
        handleDownVote={() => {}}
        {...comment}
      />,
    );

    const avatarElement = screen.getByTestId('avatar-comment');
    const nameElement = screen.getByTestId('name-comment');
    const dateElement = screen.getByTestId('date-comment');
    const contentElement = screen.getByTestId('content-comment');
    const upVotesElement = screen.getByTestId('upVotes-comment');
    const downVotesElement = screen.getByTestId('downVotes-comment');

    expect(avatarElement).toHaveAttribute('src', comment.avatar);
    expect(nameElement).toHaveTextContent(comment.name);
    expect(dateElement).toHaveTextContent('21 Juni 2021');
    expect(contentElement).toHaveTextContent(comment.content);
    expect(upVotesElement).toHaveTextContent(comment.upVotesBy.length);
    expect(downVotesElement).toHaveTextContent(comment.downVotesBy.length);
  });

  it('should call up vote function when up vote button is clicked', async () => {
    const mockHandleUpVote = vi.fn();
    render(
      <CommentItem
        handleUpVote={mockHandleUpVote}
        handleDownVote={() => {}}
        {...comment}
      />,
    );

    const upVotesByButton = screen.getByTestId('upVotes-comment-button');

    await userEvent.click(upVotesByButton);

    expect(mockHandleUpVote).toHaveBeenCalled();
  });

  it('should call down vote function when down vote button is clicked', async () => {
    const mockHandleDownVote = vi.fn();
    render(
      <CommentItem
        handleUpVote={() => {}}
        handleDownVote={mockHandleDownVote}
        {...comment}
      />,
    );

    const downVotesByButton = screen.getByTestId('downVotes-comment-button');

    await userEvent.click(downVotesByButton);

    expect(mockHandleDownVote).toHaveBeenCalled();
  });
});
