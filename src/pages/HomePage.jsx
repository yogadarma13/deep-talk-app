import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import Categories from '../components/Categories';
import Loading from '../components/Loading';

function HomePage() {
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
      <ThreadList threads={filteredThreads} />
    </div>
  );
}

export default HomePage;
