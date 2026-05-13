import React from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';

function CommentItem({
  name,
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  handleUpVote,
  handleDownVote,
}) {
  return (
    <div className='thread-comment-item'>
      <p>{name}</p>
      <div>{parser(content)}</div>
      <p>{showFormattedDate(createdAt)}</p>
      <div className='thread-vote__main'>
        <button onClick={handleUpVote}>Like: {upVotesBy.length}</button>
        <button onClick={handleDownVote}>Unlike: {downVotesBy.length}</button>
      </div>
    </div>
  );
}

export default CommentItem;
