import React from 'react';

function TopBar({ navigateAddThread, navigateLeaderboards, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <h1 className="topbar-app-name">Deep Talk</h1>

        <p className="topbar-app-subtitle">Share your thoughts with everyone</p>
      </div>

      <div className="topbar-actions">
        <button
          className="create-thread-button"
          onClick={navigateAddThread}
        >
          + Create Thread
        </button>

        <button
          className="leaderboard-button"
          onClick={navigateLeaderboards}
        >
          Leaderboard
        </button>

        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default TopBar;
