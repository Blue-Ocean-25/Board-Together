import React, { useState } from 'react';
import Home from './home/Home.jsx';
import Clue from './games/Clue.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import Yahtzee from './games/Yahtzee.jsx';
import Scrabble from './games/Scrabble.jsx';
import NavBar from './NavBar.jsx';
import SelectionPage from './SelectionPage/SelectionPage.jsx';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile/Profile.jsx';

const App = () => {
  const [friends, setFriends] = useState([]);

  return (
    <div id="app">
      <NavBar friends={friends} setFriends={setFriends} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile friends={friends} setFriends={setFriends} />} />
        <Route path="/yahtzee" element={<Yahtzee />} />
        <Route path="/scrabble" element={<Scrabble />} />
        <Route path="/clue" element={<Clue />} />
        <Route path="/selection" element={<SelectionPage />} />
      </Routes>
    </div>
  );
}

export default App;