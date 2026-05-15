import React from 'react';
import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
  return (
    <section className='thread-list'>
      {threads.map((thread) => <ThreadItem key={thread.id} {...thread} />)}
    </section>
  );
}

export default ThreadList;
