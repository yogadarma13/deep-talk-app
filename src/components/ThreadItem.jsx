import React from 'react';

function ThreadItem({ title, body, user }) {
  return (
    <div>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: body }}></div>
      <p>{`~ ${user.name}`}</p>
    </div>
  );
}

export default ThreadItem;
