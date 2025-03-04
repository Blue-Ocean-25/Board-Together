import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddFriendModal from '../friends/AddFriendModal.jsx';
import Profile from '../Profile/Profile.jsx';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';

const demoUser = {
  id: '01234',
  username: 'test',
  email: 'test@gmail.com',
  gamesPlayed: 2,
  gameHistory: ['abc', '123'],
  friends: ['12345', '67890'],
}

const SelectionPage = () => {

  const [sessions, setSessions] = useState([]);
  const [addFriendModal, setAddFriendModal] = useState(false);

  useVerifyLogin(true);
  const handleDelete = (event) => {
    var sessionId = event.target.value;
    axios.delete(`/games/${sessionid}`)
      .then(() => {
        console.log('successfully deleted game session')
      })
  }

  const openFriendModal = () => {
    setAddFriendModal(true);
  }

  // useEffect(() => {
  //   axios.get('/api/sessions')
  //     .then((results) => {
  //       setSessions(results.data)
  //     })
  // }, [])


  return (
    <div>
      {/* <Profile openFriendModal = {openFriendModal}/> */}
      <div className="gameSelection">
        <h2>Choose a game</h2>
        <div className="game"><Link to='/clue'>Clue</Link></div>
        <div className="game"><Link to='/yahtzee'>Yahtzee</Link></div>
        <div className="game"><Link to='/scrabble'>Scrabble</Link></div>
      </div>
      <div className="gameSessions">
        <h2>Games in Progress</h2>
        {sessions.length ? (
          sessions.map(session => (
            <div key={session.id}>
              {session.name}
              <button><Link to='/session/:sessionId'>Continue</Link></button>
              <button value={session.id} onClick={handleDelete}>Delete</button>
            </div>
          ))
        ) :
          (<p>No games in progress</p>)}
      </div>
    </div>
  )
}

export default SelectionPage;
