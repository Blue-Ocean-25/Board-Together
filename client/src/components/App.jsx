import React from 'react';
import Home from './home/Home.jsx';
import Clue from './games/Clue.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import Yahtzee from './games/Yahtzee.jsx';
import Scrabble from './games/Scrabble.jsx';
import { Routes, Route } from 'react-router-dom';

import Profile from './profile/Profile.jsx';
import SelectionPage from './selection/SelectionPage.jsx';

const App = () => {
  return (
    <div id="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/yahtzee" element={<Yahtzee />}/>
        <Route path="/scrabble" element={<Scrabble />}/>
        <Route path="/clue" element={<Clue />} />
      </Routes>
    </div>
  );
}

export default App;