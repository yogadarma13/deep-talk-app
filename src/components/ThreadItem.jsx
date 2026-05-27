import React from 'react';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import ActionItems from './ActionItems';
import PropTypes from 'prop-types';

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
            data-testid="ownerAvatar-thread-item"
            src={user.avatar}
            alt={user.name}
            className="thread-item-owner-image"
          />
          <div>
            <h3 data-testid="ownerName-thread-item" className="thread-item-owner-name">
              {user.name}
            </h3>
            <p data-testid="date-thread-item" className="thread-item-date">
              {showFormattedDate(createdAt)}
            </p>
          </div>
        </div>
        <div data-testid="category-thread-item" className="thread-item-category">
          #{category}
        </div>
        <h2 data-testid="title-thread-item" className="thread-item-title">
          {title}
        </h2>
        <div data-testid="body-thread-item" className="thread-item-body">
          {parser(body)}
        </div>
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

ThreadItem.propTypes = {
  /** User ID for handle up vote and down vote comment */
  userId: PropTypes.string.isRequired,
  /** The ID of Thread */
  id: PropTypes.string.isRequired,
  /** The title of Thread */
  title: PropTypes.string.isRequired,
  /** The date of Thread */
  createdAt: PropTypes.string.isRequired,
  /** The content of Thread */
  body: PropTypes.string.isRequired,
  /** The category of Thread */
  category: PropTypes.string.isRequired,
  /** The total commment of Thread */
  totalComments: PropTypes.number.isRequired,
  /** The list of up vote to show numbers of up vote comment */
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The list of down vote to show numbers of down vote comment */
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The owner of thread */
  user: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired
    }
  ).isRequired,
  /** The function to handle up vote comment */
  handleUpVote: PropTypes.func.isRequired,
  /** The function to handle down vote comment */
  handleDownVote: PropTypes.func.isRequired,
};

export default ThreadItem;
