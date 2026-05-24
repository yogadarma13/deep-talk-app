/**
 * skenario testing
 *
 * - AddThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call add thread function when add thread button is clicked
 */

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import AddThreadInput from './AddThreadInput';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('AddThreadInput component', () => {
  const title = 'Title';
  const category = 'category';
  const body = 'Description';

  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    render(
      <MemoryRouter>
        <AddThreadInput isloading={false} handleAddThread={() => {}} />
      </MemoryRouter>,
    );
    const titleInput = screen.getByTestId('title');

    await userEvent.type(titleInput, title);

    expect(titleInput).toHaveValue(title);
  });

  it('should handle category typing correctly', async () => {
    render(
      <MemoryRouter>
        <AddThreadInput isloading={false} handleAddThread={() => {}} />
      </MemoryRouter>,
    );
    const categoryInput = screen.getByTestId('category');

    await userEvent.type(categoryInput, category);

    expect(categoryInput).toHaveValue(category);
  });

  it('should handle body typing correctly', async () => {
    render(
      <MemoryRouter>
        <AddThreadInput isloading={false} handleAddThread={() => {}} />
      </MemoryRouter>,
    );
    const bodyInput = screen.getByTestId('body');

    await userEvent.type(bodyInput, body);

    expect(bodyInput).toHaveTextContent(body);
  });

  it('should call add thread function when add thread button is clicked', async () => {
    const mockAddThread = vi.fn();
    render(
      <MemoryRouter>
        <AddThreadInput isloading={false} handleAddThread={mockAddThread} />
      </MemoryRouter>,
    );
    const titleInput = screen.getByTestId('title');
    await userEvent.type(titleInput, title);
    const categoryInput = screen.getByTestId('category');
    await userEvent.type(categoryInput, category);
    const bodyInput = screen.getByTestId('body');
    await userEvent.type(bodyInput, body);
    const addThreadButton = screen.getByTestId('add-thread-button');

    await userEvent.click(addThreadButton);

    expect(mockAddThread).toBeCalledWith({
      title,
      category,
      body,
    });
  });
});
