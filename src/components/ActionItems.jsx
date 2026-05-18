import React from 'react';
import { FaRegComments } from 'react-icons/fa6';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';

function ActionItems({
  userId,
  totalComments,
  upVotesBy,
  downVotesBy,
  upVoteHandler,
  downVoteHandler,
}) {
  return (
    <div className="action-items">
      <div className="action-item">
        <FaRegComments className="action-item-comment" />
        {totalComments}
      </div>
      <div className="action-item">
        <button onClick={upVoteHandler}>
          {upVotesBy.includes(userId) ? (
            <BiSolidLike className="action-item-active" />
          ) : (
            <BiLike />
          )}
        </button>
        {upVotesBy.length}
      </div>

      <div className="action-item">
        <button onClick={downVoteHandler}>
          {downVotesBy.includes(userId) ? (
            <BiSolidDislike className="action-item-active" />
          ) : (
            <BiDislike />
          )}
        </button>
        {downVotesBy.length}
      </div>
    </div>
  );
}

export default ActionItems;
