import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function TopBar({ pathname, onLogout }) {
  return (
    <div className="topbar">
      <div>
        <Link to={'/'} className="topbar-app-name-link">
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
          Leaderboards
        </Link>

        <Link className="logout-button" onClick={onLogout}>
          Logout
        </Link>
      </div>
    </div>
  );
}

TopBar.propTypes = {
  /** Pathname for handle visibility of Add Thread Button (`/addThread` for hide Add Thread Button) */
  pathname: PropTypes.string.isRequired,
  /** The function for logout */
  onLogout: PropTypes.func.isRequired
};

export default TopBar;
