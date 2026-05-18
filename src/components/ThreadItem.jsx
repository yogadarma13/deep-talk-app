import React from 'react';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import ActionItems from './ActionItems';

function ThreadItem({
  userId,
  id,
  title,
  createdAt,
  body,
  category,
  totalComments,
  upVotesBy,
  downVotesBy,
  user,
  handleUpVote,
  handleDownVote
}) {

  const upVoteHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleUpVote(id);
  };

  const downVoteHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleDownVote(id);
  };

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
        <div className="thread-item-category">#{category}</div>
        <h2 className="thread-item-title">{title}</h2>
        <div className="thread-item-body">{parser(body)}</div>
        <ActionItems
          userId={userId}
          totalComments={totalComments}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          upVoteHandler={upVoteHandler}
          downVoteHandler={downVoteHandler}
        />
      </div>
    </Link>
  );
}

export default ThreadItem;
