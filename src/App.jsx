import React from 'react';
import RegisterPage from './pages/RegisterPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
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

export default App;
