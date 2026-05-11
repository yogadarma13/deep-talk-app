import React from 'react';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import AddThreadPage from './pages/AddThreadPage';

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
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/addThread' element={<AddThreadPage />}/>
      </Routes>
    </div>
  );
}

export default App;
