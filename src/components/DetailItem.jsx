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
