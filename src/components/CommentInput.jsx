import React, { useRef } from 'react';
import useContentEditable from '../hooks/useContentEditable';
import LoadingButton from './LoadingButton';

function CommentInput({ isLoading, handleAddComment }) {
  const [comment, handleCommentValue, setComment] = useContentEditable('');
  const commentRef = useRef();

  const onSubmitComment = () => {
    handleAddComment(comment);

    if (commentRef.current) {
      commentRef.current.innerHTML = '';
      setComment('');
    }
  };

  return (
    <div className="comment-form-card">
      <h2>
          Add Comment
      </h2>
      <div
        data-testid="comment-input"
        ref={commentRef}
        className="comment-form-card-content"
        data-placeholder="Write your comment..."
        contentEditable
        onInput={handleCommentValue}
      />
      {isLoading ? (
        <LoadingButton />
      ) : (
        <button
          data-testid="add-comment-button"
          onClick={onSubmitComment}>Post Comment
        </button>
      )}
    </div>
  );
}

export default CommentInput;
