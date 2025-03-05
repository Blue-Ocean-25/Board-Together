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

const sessions = [
  { id: 1, name: 'Clue' },
  { id: 2, name: 'Yahtzee' }
]

const SelectionPage = () => {

  // const [sessions, setSessions] = useState([]);
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
      <div className="divider mt-10 mb-10" />
      <h1 className="text-3xl mb-10 font-bold">Games in Progress:</h1>
      <ul className="list bg-base-100 rounded-box shadow-md mt-10">
        {sessions.length ? (
          sessions.map(session => (
            <li className="list-row flex justify-between" key={session.id}>
              <div className=''>
                <h3 className="text-xl mr-5">{session.name + ': '}</h3>
              </div>
              <div className="join">
                <Link className="btn btn-neutral join-item" to={`/session/${session.id}`}>Continue</Link>
                <button className="btn btn-secondary join-item" value={session.id} onClick={handleDelete}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>No games in progress</p>
        )}
      </ul>
    </div>
  )
}

export default SelectionPage;
