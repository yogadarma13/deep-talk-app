import React from 'react';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';

function App() {
  const { authUser = null } = useSelector((states) => states);

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
      <HomePage />
    </div>
  );
}

export default App;
