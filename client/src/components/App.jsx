import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
const App = () => {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;