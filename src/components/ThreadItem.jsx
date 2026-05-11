import React from 'react';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';

function ThreadItem({ id, title, createdAt, body, user }) {
  return (
    <Link to={`/threads/${id}`}>
      <div className='thread-list-item'>
        <h3>{title}</h3>
        <p>{`~ ${user.name}`}</p>
        <p>{showFormattedDate(createdAt)}</p>
        <div className='thread-item__body'>{parser(body)}</div>
      </div>
    </Link>
  );
}

export default ThreadItem;
