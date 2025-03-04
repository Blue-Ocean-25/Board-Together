import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  AddFriendModal from '../friends/AddFriendModal.jsx';
import axios from 'axios';

const demoUser = {
  id: '01234',
  username: 'test',
  email: 'test@gmail.com',
  gamesPlayed: 2,
  gameHistory: ['abc', '123'],
  friends: ['12345', '67890'],
}

const Profile = ({openFriendModal}) => {
  const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);


  // fetch friends
  useEffect(() => {
    // TO DO -> touch base with Beto and Kevin about cookie or login info
    axios.get('/api/profiles/:email')
      .then((results) => {
        setUser(results.data)
        setFriends(results.data.friends)
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
        <button onClick={openFriendModal}>Add Friend By Username</button>
        <AddFriendModal friends={demoUser.friends} />
        {friends !== undefined ? friends.map(friend => (
          <div key={friend.id}>
            <Link to='/profile/:id'>{friends.username}</Link>
          </div>
        )) : null}
      </div>
    </div>
  )
};

export default Profile;