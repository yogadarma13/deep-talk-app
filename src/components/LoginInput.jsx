import React from 'react';
import FieldInput from './FieldInput';
import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';

function LoginInput({ handleLogin }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <div className='login-input-card'>
      <h2 className="app-name">Deep Talk</h2>
      <h1 className="login-title">Welcome Back</h1>
      <p className="login-subtitle">Please login to continue</p>

      <div className='login-form'>
        <FieldInput
          label="Email"
          type="email"
          value={email}
          handleInput={setEmail}
        />
        <FieldInput
          label="Password"
          type="password"
          value={password}
          handleInput={setPassword}
        />
        <button className='login-button' onClick={() => handleLogin({ email, password })}>
          Masuk
        </button>
      </div>
      <p className='register-text'>
          Don&apos;t have an account? <Link to="/register"><span>Register</span></Link>
      </p>
    </div>
  );
}

export default LoginInput;
