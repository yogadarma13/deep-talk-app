import React from 'react';

function NotFoundPage() {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-number">
          404
        </div>

        <h1 className="notfound-title">
          Page Not Found
        </h1>

        <p className="notfound-description">
          Sorry, the page you are looking for
          does not exist or has been moved.
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;