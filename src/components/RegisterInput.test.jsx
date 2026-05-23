import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  const name = 'Tes123';
  const email = 'tes@gmail.com';
  const password = '123456';

  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(
      <MemoryRouter>
        <RegisterInput isloading={false} handleRegister={() => {}} />
      </MemoryRouter>,
    );
    const nameInput = screen.getByTestId('name-input');

    await userEvent.type(nameInput, name);

    expect(nameInput).toHaveValue(name);
  });

  it('should handle email typing correctly', async () => {
    render(
      <MemoryRouter>
        <RegisterInput isloading={false} handleRegister={() => {}} />
      </MemoryRouter>,
    );
    const emailInput = screen.getByTestId('email-input');

    await userEvent.type(emailInput, email);

    expect(emailInput).toHaveValue(email);
  });

  it('should handle password typing correctly', async () => {
    render(
      <MemoryRouter>
        <RegisterInput isloading={false} handleRegister={() => {}} />
      </MemoryRouter>,
    );
    const passwordInput = screen.getByTestId('password-input');

    await userEvent.type(passwordInput, password);

    expect(passwordInput).toHaveValue(password);
  });

  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(
      <MemoryRouter>
        <RegisterInput isloading={false} handleRegister={mockRegister} />
      </MemoryRouter>,
    );
    const nameInput = screen.getByTestId('name-input');
    await userEvent.type(nameInput, name);
    const emailInput = screen.getByTestId('email-input');
    await userEvent.type(emailInput, email);
    const passwordInput = screen.getByTestId('password-input');
    await userEvent.type(passwordInput, password);
    const registerButton = screen.getByTestId('register-button');

    await userEvent.click(registerButton);

    expect(mockRegister).toBeCalledWith({
      name,
      email,
      password,
    });
  });

  it('should redirect to login page correctly', () => {
    render(
      <MemoryRouter>
        <RegisterInput isloading={false} handleRegister={() => {}} />
      </MemoryRouter>,
    );

    const registerLink = screen.getByRole('link', {
      name: /login/i,
    });

    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/');
  });
});
