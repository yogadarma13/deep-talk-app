import React from 'react';

function FieldInput({ 'data-testid': testId, label, type, value, handleInput }) {
  return (
    <div className="field-input-group">
      <label>{label}</label>
      <input
        data-testid={testId}
        onChange={handleInput}
        value={value}
        type={type}
      />
    </div>
  );
}

export default FieldInput;