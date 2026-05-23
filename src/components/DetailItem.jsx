import React from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import ActionItems from './ActionItems';

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

export default DetailItem;
