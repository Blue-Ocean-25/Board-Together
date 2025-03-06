import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-base-400">404</h1>
        <p className="text-2xl font-semibold text-base-600">Page Not Found</p>
        <p className="mt-4 text-base-500">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="mt-6 btn btn-secondary">Go Home</a>
      </div>
    </div>
  );
};

export default NotFound;