import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';

function HomePage() {
  const { threads = [], users = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const allThreads = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId)
  }));

  return <ThreadList threads={allThreads} />;
}

export default HomePage;
