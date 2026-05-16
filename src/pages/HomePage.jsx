import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadList from '../components/ThreadList';
import { asyncPopulateThreadsAndUsers } from '../states/shared/action';
import Categories from '../components/Categories';

function HomePage() {
  const { threads = [], users = [] } = useSelector((states) => states);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'General', 'Discussion', 'Redux', 'Perkenalan'];

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const filteredThreads = useMemo(() => {
    if (selectedCategory === 'All') {
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

  return (
    <div className="home-page__main">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ThreadList threads={filteredThreads} />
    </div>
  );
}

export default HomePage;
