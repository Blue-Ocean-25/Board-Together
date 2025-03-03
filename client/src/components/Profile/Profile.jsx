import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Profile = () => {
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
        <button onClick={openFriendModal}>Add Friend By Username</button>
        <AddFriendModal friends={demoUser.friends} />
        {friends.map(friend => (
          <div key={friend.id}>
            <Link to='/profile/:id'>{friends.username}</Link>
          </div>
        ))}
      </div>
    </div>
  )
};
