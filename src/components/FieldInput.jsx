import PropTypes from 'prop-types';
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

FieldInput.propTypes = {
  /** The label of Field Input */
  label: PropTypes.string.isRequired,
  /** The type of Field Input */
  type: PropTypes.string.isRequired,
  /** The value of Field Input */
  value: PropTypes.string.isRequired,
  /** The function for handle input */
  handleInput: PropTypes.func.isRequired
};

export default FieldInput;