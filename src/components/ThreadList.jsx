import React from 'react';
import ThreadItem from './ThreadItem';

function ThreadList({ userId, threads, handleUpVote, handleDownVote }) {
  return (
    <section className="thread-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          userId={userId}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
          {...thread}
        />
      ))}
    </section>
  );
}

export default ThreadList;
