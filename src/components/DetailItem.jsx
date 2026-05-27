import React from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import ActionItems from './ActionItems';
import PropTypes from 'prop-types';

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
      <div data-testid="category-detail" className="detail-category">
        #{category}
      </div>

      <h1 data-testid="title-detail" className="detail-title">
        {title}
      </h1>

      <div className="detail-owner">
        <img
          data-testid="owner-avatar-detail"
          src={ownerAvatar}
          alt={ownerName}
          className="detail-owner-avatar"
        />

        <div>
          <h3 data-testid="owner-name-detail" className="detail-owner-name">
            {ownerName}
          </h3>

          <p data-testid="date-detail" className="detail-date">
            {showFormattedDate(createdAt)}
          </p>
        </div>
      </div>

      <div data-testid="body-detail" className="detail-body">
        {parser(body)}
      </div>

      <ActionItems
        userId={userId}
        totalComments={comments.length}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        upVoteHandler={handleUpVote}
        downVoteHandler={handleDownVote}
      />
    </div>
  );
}

DetailItem.propTypes = {
  /** User ID for handle up vote and down vote comment */
  userId: PropTypes.string.isRequired,
  /** The category of Thread */
  category: PropTypes.string.isRequired,
  /** The title of Thread */
  title: PropTypes.string.isRequired,
  /** The content of Thread */
  body: PropTypes.string.isRequired,
  /** The name of owner thread */
  ownerName: PropTypes.string.isRequired,
  /** The avatar of owner thread */
  ownerAvatar: PropTypes.string.isRequired,
  /** The date of Thread */
  createdAt: PropTypes.string.isRequired,
  /** The list of commment to show numbers of comment */
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  /** The list of up vote to show numbers of up vote comment */
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The list of down vote to show numbers of down vote comment */
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The function to handle up vote comment */
  handleUpVote: PropTypes.func.isRequired,
  /** The function to handle down vote comment */
  handleDownVote: PropTypes.func.isRequired,
};

export default DetailItem;
