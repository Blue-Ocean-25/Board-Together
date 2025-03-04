import React from 'react';
import { Link } from 'react-router-dom';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';
const Home = () => {
  const loggedIn = useVerifyLogin(false);
  if (loggedIn === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
        <h1 className="text-6xl font-bold mb-25">Loading...</h1>
      </div>
    )
  }
  if (loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
        <h1 className="text-6xl font-bold mb-25">Welcome to Board Together!</h1>
        <Link to="/selection" className="btn btn-accent text-2xl">Go to Selection Page</Link>
        <small className="fixed bottom-4 right-4 text-lg">Hasbruh&copy;</small>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
      <h1 className="text-6xl font-bold mb-50">Welcome to Board Together!</h1>
      <div className="space-x-8">
        <Link to="/login" className="btn btn-accent text-2xl py-2 px-4">Login</Link>
        <Link to="/signup" className="btn btn-neutral text-2xl py-2 px-4">Sign Up</Link>
      </div>
      <small className="fixed bottom-4 right-4 text-lg">Hasbruh&copy;</small>
    </div>
  );
};

export default Home;