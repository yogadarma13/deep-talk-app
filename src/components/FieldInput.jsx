import React from 'react';

function FieldInput({ label, type, value, handleInput }) {
  return (
    <>
      <label>{label}</label>
      <input
        onChange={handleInput}
        value={value}
        type={type}
      />
    </>
  );
}

export default FieldInput;