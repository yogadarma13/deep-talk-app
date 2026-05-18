import React, { useEffect } from 'react';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import AddThreadPage from './pages/AddThreadPage';
import DetailPage from './pages/DetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import LeaderboardsPage from './pages/LeaderBoardsPage';
import TopBar from './components/TopBar';
import { asyncUnsetAuthUser } from './states/authUser/action';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  const onLogout = () => {
    const confirmLogout = confirm('Yakin ingin keluar?');
    if (confirmLogout) {
      dispatch(asyncUnsetAuthUser());
    }
  };

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
      <header className="topbar">
        <TopBar pathname={location.pathname} onLogout={onLogout}/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/addThread" element={<AddThreadPage />}/>
          <Route path="/threads/:id" element={<DetailPage />}/>
          <Route path="/leaderboards" element={<LeaderboardsPage />}/>
          <Route path="/*" element={<NotFoundPage />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
