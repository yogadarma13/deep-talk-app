import React from 'react';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';

function CommentItem({ name, content, createdAt }) {
  return (
    <div className='thread-comment-item'>
      <p>{name}</p>
      <div>{parser(content)}</div>
      <p>{showFormattedDate(createdAt)}</p>
    </div>
  );
}

export default CommentItem;
