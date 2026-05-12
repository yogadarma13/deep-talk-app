import React from 'react';
import useInput from '../hooks/useInput';

function CommentInput({ handleAddComment }) {
  const [content, handleContentChange, setContent] = useInput('');

  const onSubmitComment = () => {
    handleAddComment(content);
    setContent('');
  };

  return (
    <div className='comment-input'>
      <input onChange={handleContentChange} value={content} type='text' />
      <button onClick={onSubmitComment}>Komen</button>
    </div>
  );
}

export default CommentInput;
