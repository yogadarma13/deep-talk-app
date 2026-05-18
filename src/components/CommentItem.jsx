import React from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';

function CommentItem({
  userId,
  name,
  avatar,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  handleUpVote,
  handleDownVote,
}) {
  return (
    <div className="comment-item-card">
      <div className="comment-item-owner">
        <img src={avatar} alt={name} className="comment-item-avatar" />

        <div>
          <h3 className="comment-item-name">{name}</h3>
          <p className="comment-item-date">{showFormattedDate(createdAt)}</p>
        </div>
      </div>

      <div className="comment-item-content">{parser(content)}</div>

      <div className="comment-item-stats">
        <div className="comment-item-stat">
          <button onClick={handleUpVote}>
            {upVotesBy.includes(userId) ? (
              <BiSolidLike className="comment-item-stat-active" />
            ) : (
              <BiLike />
            )}
          </button>
          {upVotesBy.length}
        </div>
        <div className="comment-item-stat">
          <button onClick={handleDownVote}>
            {downVotesBy.includes(userId) ? (
              <BiSolidDislike className="comment-item-stat-active" />
            ) : (
              <BiDislike />
            )}
          </button>
          {downVotesBy.length}
        </div>
      </div>
    </div>
  );
}

export default CommentItem;
