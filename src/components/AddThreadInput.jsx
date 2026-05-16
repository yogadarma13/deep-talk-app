import React from 'react';
import useInput from '../hooks/useInput';

function AddThreadInput({ categories, handleAddThread }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  return (
    <div className='add-thread-card'>
      <div className="add-thread-header">
        <h1 className="add-thread-title">Create Thread</h1>
        <p className="add-thread-subtitle">Share your thoughts with everyone</p>
      </div>

      <div className='add-thread-form'>
        <div className="add-thread-input-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="Enter thread title"
            value={title}
            onChange={setTitle}
          />
        </div>
        <div className="add-thread-input-group">
          <label>Category</label>

          <select
            value={category}
            onChange={setCategory}
          >
            <option value="">Select category</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="add-thread-input-group">
          <label>Description</label>

          <textarea
            placeholder="Write your thread description..."
            rows="6"
            value={body}
            onChange={setBody}
          />
        </div>
        <button
          className='add-thread-submit-button'
          onClick={() => handleAddThread({ title, category, body })}>
            Post Thread
        </button>
      </div>
    </div>
  );
}

export default AddThreadInput;
