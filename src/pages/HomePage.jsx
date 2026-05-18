import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import { asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';

function HomePage() {
  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const isLoading = useSelector((state) => state.isLoading);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const filteredThreads = useMemo(() => {
    if (selectedCategory === '') {
      return threads.map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
      }));
    }

    return threads
      .filter(
        (thread) =>
          thread.category.toLowerCase() === selectedCategory.toLowerCase(),
      )
      .map((thread) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId),
      }));
  }, [selectedCategory, threads]);

  const categories = threads.map((thread) => thread.category);

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category !== selectedCategory ? category : '');
  };

  const upVoteThread = (threadId) => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const downVoteThread = (threadId) => {
    dispatch(asyncDownVoteThread(threadId));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="home-page__main">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        handleSelectedCategory={handleSelectedCategory}
      />
      <ThreadList
        userId={authUser.id}
        threads={filteredThreads}
        handleUpVote={upVoteThread}
        handleDownVote={downVoteThread}
      />
    </div>
  );
}

export default HomePage;
