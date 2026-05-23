import React from 'react';
import useInput from '../hooks/useInput';
import FieldInput from './FieldInput';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';

function RegisterInput({ isLoading, handleRegister }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <div className="register-input-card">
      <h2 className="app-name">Deep Talk</h2>
      <h1 className="register-title">Register Account</h1>
      <p className="register-subtitle">Please register to create account</p>
      <div className="register-form">
        <FieldInput
          data-testid="name-input"
          label="Nama"
          type="text"
          value={name}
          handleInput={setName}
        />
        <FieldInput
          data-testid="email-input"
          label="Email"
          type="email"
          value={email}
          handleInput={setEmail}
        />
        <FieldInput
          data-testid="password-input"
          label="Password"
          type="password"
          value={password}
          handleInput={setPassword}
        />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button
            data-testid="register-button"
            className="register-button"
            onClick={() => handleRegister({ name, email, password })}
          >
            Daftar
          </button>
        )}
      </div>
      <p className="login-text">
          Have an account? <Link to="/"><span>Login</span></Link>
      </p>
    </div>
  );
}

export default RegisterInput;
