import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div className='navigation'>
      <h3>Deep Talk</h3>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/leaderboards'>Leaderboards</Link>
      </nav>
    </div>
  );
}

export default Navigation;
