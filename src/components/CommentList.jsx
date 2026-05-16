import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ userId, comments, upVoteComment, downVoteComment }) {
  return (
    <div className="comment-list">
      <h3>Comments ({comments.length})</h3>

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          userId={userId}
          name={comment.owner.name}
          avatar={comment.owner.avatar}
          handleUpVote={() => upVoteComment(comment.id)}
          handleDownVote={() => downVoteComment(comment.id)}
          {...comment}
        />
      ))}
    </div>
  );
}

export default CommentList;
