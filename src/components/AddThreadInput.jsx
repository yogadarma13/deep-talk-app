import React from 'react';
import useInput from '../hooks/useInput';
import useContentEditable from '../hooks/useContentEditable';
import LoadingButton from './LoadingButton';

function AddThreadInput({ isLoading, handleAddThread }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useContentEditable('');

  return (
    <div className="add-thread-card">
      <div className="add-thread-header">
        <h1 className="add-thread-title">Create Thread</h1>
        <p className="add-thread-subtitle">Share your thoughts with everyone</p>
      </div>

      <div className="add-thread-form">
        <div className="add-thread-input-group">
          <label>Title</label>

          <input
            data-testid="title"
            type="text"
            placeholder="Enter thread title"
            value={title}
            onChange={setTitle}
          />
        </div>
        <div className="add-thread-input-group">
          <label>Category</label>

          <input
            data-testid="category"
            type="text"
            placeholder="Enter thread category"
            value={category}
            onChange={setCategory}
          />
        </div>
        <div className="add-thread-input-group">
          <label>Description</label>

          <div
            data-testid="body"
            className="add-thread-input-group-body"
            data-placeholder="Write your thread description..."
            contentEditable
            onInput={setBody}
          />
        </div>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <button
            data-testid="add-thread-button"
            className="add-thread-submit-button"
            onClick={() => handleAddThread({ title, category, body })}
          >
            Post Thread
          </button>
        )}
      </div>
    </div>
  );
}

export default AddThreadInput;
