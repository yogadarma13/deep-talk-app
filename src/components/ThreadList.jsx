import React from 'react';
import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
  return threads.map((thread) => <ThreadItem key={thread.id} {...thread} />);
}

export default ThreadList;
