import React from 'react';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { FaRegComments } from 'react-icons/fa6';
import { BiLike, BiDislike } from 'react-icons/bi';

function ThreadItem({
  id,
  title,
  createdAt,
  body,
  category,
  totalComments,
  upVotesBy,
  downVotesBy,
  user,
}) {
  return (
    <Link to={`/threads/${id}`} className="thread-item-link">
      <div className="thread-item-card">
        <div className="thread-item-owner">
          <img
            src={user.avatar}
            alt={user.name}
            className="thread-item-owner-image"
          />
          <div>
            <h3 className="thread-item-owner-name">{user.name}</h3>
            <p className="thread-item-date">{showFormattedDate(createdAt)}</p>
          </div>
        </div>
        <div className="thread-item-category">{category}</div>
        <h2 className="thread-item-title">{title}</h2>
        <div className="thread-item-body">{parser(body)}</div>
        <div className="thread-item-footer">
          <div className="thread-item-stat">
            <FaRegComments /> {totalComments}
          </div>
          <div className="thread-item-stat">
            <BiLike /> {upVotesBy.length}
          </div>
          <div className="thread-item-stat">
            <BiDislike /> {downVotesBy.length}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ThreadItem;
