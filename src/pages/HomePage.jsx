import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const { threads = [], users = [] } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const allThreads = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId)
  }));

  return (
    <>
      <button onClick={() => navigate('/addThread')}>Tambah Thread</button>
      <ThreadList threads={allThreads} />
    </>
  );
}

export default HomePage;
