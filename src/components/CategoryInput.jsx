import React from 'react';

function CategoryInput({ value, handleValue }) {
  return (
    <>
      <label>Category</label>
      <select value={value} onChange={handleValue}>
        <option value="general">General</option>
        <option value="discussion">Discussion</option>
        <option value="redux">Redux</option>
        <option value="perkenalan">Perkenalan</option>
      </select>
    </>
  );
}

export default CategoryInput;
