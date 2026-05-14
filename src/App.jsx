import React, { useEffect } from 'react';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import Navigation from './components/Navigation';
import LeaderboardsPage from './pages/LeaderBoardsPage';

function App() {
  const { authUser = null, isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <div className="app-container">
        <Routes>
          <Route
            path="/*"
            element={<LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/addThread' element={<AddThreadPage />}/>
          <Route path='/threads/:id' element={<DetailPage />}/>
          <Route path='/leaderboards' element={<LeaderboardsPage />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
