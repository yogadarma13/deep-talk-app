import React from 'react';
import useInput from '../hooks/useInput';
import FieldInput from './FieldInput';

function RegisterInput({ handleRegister }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <>
      <FieldInput label="Nama" type="text" value={name} handleInput={setName} />
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
      <button onClick={() => handleRegister({ name, email, password })}>
        Daftar
      </button>
    </>
  );
}

export default RegisterInput;
