import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Board Together!</h1>
      <button><Link to="/login">Login</Link></button>
      <button><Link to="/signup">Sign Up</Link></button>
      <small>Hasbruh&copy;</small>
    </div>
  );
};

export default Home;