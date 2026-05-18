import React from 'react';
import parser from 'html-react-parser';
import { FaRegComments } from 'react-icons/fa6';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { showFormattedDate } from '../utils';

function DetailItem({
  userId,
  category,
  title,
  body,
  ownerName,
  ownerAvatar,
  createdAt,
  comments,
  upVotesBy,
  downVotesBy,
  handleUpVote,
  handleDownVote
}) {
  return (
    <div className="detail-card">
      <div className="detail-category">{category}</div>

      <h1 className="detail-title">{title}</h1>

      <div className="detail-owner">
        <img src={ownerAvatar} alt={ownerName} className="detail-owner-avatar" />

        <div>
          <h3 className="detail-owner-name">{ownerName}</h3>

          <p className="detail-date">{showFormattedDate(createdAt)}</p>
        </div>
      </div>

      <div className="detail-body">{parser(body)}</div>

      <div className="detail-stats">
        <div className="detail-stat">
          <FaRegComments className="detail-stat-comment" />
          {comments.length}
        </div>
        <div className="detail-stat">
          <button onClick={handleUpVote}>
            {upVotesBy.includes(userId) ? (
              <BiSolidLike className="detail-stat-active" />
            ) : (
              <BiLike />
            )}
          </button>
          {upVotesBy.length}
        </div>

        <div className="detail-stat">
          <button onClick={handleDownVote}>
            {downVotesBy.includes(userId) ? (
              <BiSolidDislike className="detail-stat-active" />
            ): (
              <BiDislike />
            )}
          </button>
          {downVotesBy.length}
        </div>
      </div>
    </div>
  );
}

export default DetailItem;
