import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ handleLogout }) {
  return (
    <div className='navigation'>
      <h3>Deep Talk</h3>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/leaderboards'>Leaderboards</Link>
        <button onClick={handleLogout}>Keluar</button>
      </nav>
    </div>
  );
}

export default Navigation;
