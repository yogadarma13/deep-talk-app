/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle comment typing correctly
 *   - should call add comment function when add comment button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentInput from './CommentInput';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

describe('CommentInput component', () => {
  const comment = 'Comment 1';

  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    render(<CommentInput isLoading={false} handleAddComment={() => {}} />);

    const commentInput = screen.getByTestId('comment-input');

    await userEvent.type(commentInput, comment);

    expect(commentInput).toHaveTextContent(comment);
  });

  it('should call add comment function when add comment button is clicked', async () => {
    const mockAddComment = vi.fn();
    render(
      <CommentInput isLoading={false} handleAddComment={mockAddComment} />,
    );

    const commentInput = screen.getByTestId('comment-input');
    await userEvent.type(commentInput, comment);
    const addCommentButton = screen.getByTestId('add-comment-button');

    await userEvent.click(addCommentButton);

    expect(mockAddComment).toBeCalledWith(comment);
  });
});
