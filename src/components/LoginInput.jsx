import React from 'react';
import FieldInput from './FieldInput';
import useInput from '../hooks/useInput';

function LoginInput({ handleLogin }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <>
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
      <button onClick={() => handleLogin({ email, password })}>
        Masuk
      </button>
    </>
  );
}

export default LoginInput;
