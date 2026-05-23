import React from 'react';
import FieldInput from './FieldInput';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';

function LoginInput({ isloading, handleLogin }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <div className="login-input-card">
      <h2 className="app-name">Deep Talk</h2>
      <h1 className="login-title">Welcome Back</h1>
      <p className="login-subtitle">Please login to continue</p>

      <div className="login-form">
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
        {isloading ? (
          <LoadingButton />
        ) : (
          <button
            data-testId="login-button"
            className="login-button"
            onClick={() => handleLogin({ email, password })}
          >
            Masuk
          </button>
        )}
      </div>
      <p className="register-text">
          Don&apos;t have an account? <Link to="/register"><span>Register</span></Link>
      </p>
    </div>
  );
}

export default LoginInput;
