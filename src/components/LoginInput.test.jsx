/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 *   - should redirect to register page correctly
 */

import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LoginInput from './LoginInput';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';

expect.extend(matchers);

describe('LoginInput component', () => {
  const email = 'tes@gmail.com';
  const password = '123456';

  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} handleLogin={() => {}} />
      </MemoryRouter>,
    );
    const emailInput = screen.getByTestId('email-input');

    await userEvent.type(emailInput, email);

    expect(emailInput).toHaveValue(email);
  });

  it('should handle password typing correctly', async () => {
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} handleLogin={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(passwordInput, password);

    expect(passwordInput).toHaveValue(password);
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} handleLogin={mockLogin} />
      </MemoryRouter>,
    );
    const emailInput = screen.getByTestId('email-input');
    await userEvent.type(emailInput, email);
    const passwordInput = screen.getByTestId('password-input');
    await userEvent.type(passwordInput, password);
    const loginButton = screen.getByTestId('login-button');

    await userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email,
      password,
    });
  });

  it('should redirect to register page correctly', () => {
    render(
      <MemoryRouter>
        <LoginInput isLoading={false} handleLogin={() => {}} />
      </MemoryRouter>
    );

    const registerLink = screen.getByRole('link', {
      name: /register/i,
    });

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
