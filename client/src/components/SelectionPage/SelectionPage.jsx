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
    <div className="flex flex-col items-center mt-40">
      <div className="gameSelection flex flex-col items-center">
        <h1 className="text-3xl mb-20 font-bold">Choose a game:</h1>
        <div className="flex justify-between w-full max-w-md mb-10">
          <Link className="btn btn-accent mx-6" id="clue" to='/clue'>Clue</Link>
          <Link className="btn btn-accent mx-6" id="yahtzee" to='/yahtzee'>Yahtzee</Link>
          <Link className="btn btn-accent mx-6" id="scrabble" to='/scrabble'>Scrabble</Link>
        </div>
      </div>
      <div className="divider mt-10" />
      <div className="flex flex-col items-center gameSessions mt-10">
        <h1 className="text-3xl mb-20 font-bold">Games in Progress:</h1>
        {sessions.length ? (
          sessions.map(session => (
            <div className="mx-6" key={session.id}>
              <h3 className="text-xl">{session.name}</h3>
              <Link className="btn btn-neutral" to='/session/:sessionId'>Continue</Link>
              <button className="btn btn-secondary" value={session.id} onClick={handleDelete}>Delete</button>
            </div>
          ))
        ) :
          (<p>No games in progress</p>)}
      </div>
    </div>
  )
}

export default SelectionPage;
