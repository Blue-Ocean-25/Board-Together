import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddFriendModal from '../friends/AddFriendModal.jsx';

//create modal for adding number of players, naming session, confirm button
const demoUser = {
  id: '01234',
  username: 'test',
  email: 'test@gmail.com',
  gamesPlayed: 2,
  gameHistory: ['abc', '123'],
  friends: ['12345', '67890'],
}

const SelectionPage = () => {
  const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [addFriendModal, setAddFriendModal] = useState(false);

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

  // fetch friends
  useEffect(() => {
    axios.get('/api/profiles/:email')
      .then((results) => {
        setUser(results.data)
        setFriends(results.data.friends)
      })
    axios.get('/api/sessions')
      .then((results) => {
        setSessions(results.data)
      })
  }, [])

  return (
    <div>
      <div className="profile">
        <h1>Welcome, {demoUser.username}!</h1>
        <p>Email: {demoUser.email}</p>
        <p>Games Played: {demoUser.gamesPlayed}</p>
        <p>Game History: {demoUser.gameHistory}</p>
        <p>Friends: {demoUser.friends}</p>
      </div>
      <div className="friends">
        <button onClick ={openFriendModal}>Add Friend By Username</button>
        <AddFriendModal friends = {demoUser.friends} />
        {friends.map(friend => (
          <div key={friend.id}>
            <Link to='/profile/user/:id'>{friends.username}</Link>
          </div>
        ))}
      </div >
      <div className="gameSelection">
        <h2>Choose a game</h2>
        <div className="game"><Link to='/games/clue'>Clue</Link></div>
        <div className="game"><Link to='/games/yahtzee'>Yatzee</Link></div>
        <div className="game"><Link to='/games/scrabble'>Scrabble</Link></div>
      </div>
      <div className="gameSessions">
        <h2>Games in Progress</h2>
        {sessions.length ? (
          sessions.map(session => (
            <div key={session.id}>
              {session.name}
              <button><Link to='/session/:sessionId'>Continue</Link></button>
              <button value={session.id} onClick={handleDelete}>Delete</buttono>
            </div>
          ))
        ) :
          (<p>No games in progress</p>)}
      </div>
    </div >
  )
}

export default SelectionPage;
