import React from 'react';

function FieldInput({ label, type, value, handleInput }) {
  return (
    <div className='field-input-group'>
      <label>{label}</label>
      <input
        onChange={handleInput}
        value={value}
        type={type}
      />
    </div>
  );
}

export default FieldInput;