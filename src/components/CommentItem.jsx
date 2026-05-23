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
        <img
          data-testid="avatar-comment"
          src={avatar}
          alt={name}
          className="comment-item-avatar"
        />

        <div>
          <h3 data-testid="name-comment" className="comment-item-name">
            {name}
          </h3>
          <p data-testid="date-comment" className="comment-item-date">
            {showFormattedDate(createdAt)}
          </p>
        </div>
      </div>

      <div data-testid="content-comment" className="comment-item-content">
        {parser(content)}
      </div>

      <div className="comment-item-stats">
        <div data-testid="upVotes-comment" className="comment-item-stat">
          <button data-testid="upVotes-comment-button" onClick={handleUpVote}>
            {upVotesBy.includes(userId) ? (
              <BiSolidLike className="comment-item-stat-active" />
            ) : (
              <BiLike />
            )}
          </button>
          {upVotesBy.length}
        </div>
        <div data-testid="downVotes-comment" className="comment-item-stat">
          <button data-testid="downVotes-comment-button" onClick={handleDownVote}>
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
