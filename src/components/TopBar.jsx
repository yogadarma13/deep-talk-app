import React from 'react';
import { Link } from 'react-router-dom';

function TopBar({ pathname, onLogout }) {
  return (
    <>
      <div>
        <Link to={'/'} className='topbar-app-name-link'>
          <h1 className="topbar-app-name">Deep Talk</h1>
        </Link>
        <p className="topbar-app-subtitle">Share your thoughts with everyone</p>
      </div>

      <div className="topbar-actions">
        {pathname !== '/addThread' ? (
          <Link className="create-thread-button" to={'/addThread'}>
            + Create Thread
          </Link>
        ) : null}

        <Link className="leaderboard-button" to={'/leaderboards'}>
          Leaderboard
        </Link>

        <Link className="logout-button" onClick={onLogout}>
          Logout
        </Link>
      </div>
    </>
  );
}

export default TopBar;
