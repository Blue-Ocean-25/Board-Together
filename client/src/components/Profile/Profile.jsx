import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFriendModal from '../friends/AddFriendModal.jsx';
import axios from 'axios';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';

const demoUser = {
  id: '01234',
  username: 'test',
  email: 'test@gmail.com',
  gamesPlayed: 2,
  gameHistory: ['abc', '123'],
  friends: ['12345', '67890'],
}

const Profile = ({ openFriendModal }) => {
  const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const { email } = useVerifyLogin(true);


  useEffect(() => {
    console.log('EMAIL:  ', email);
    if (email.length > 0) {
      axios.get(`/api/profile/${email}`)
        .then((results) => {
          console.log('RESULTS:  ', results.data);
          setUser(results.data[0]);
          // setFriends(results.data.friends);
        }).catch((err) => {
          console.error(err);
        });
    }
  }, [email]);

  
  return (
    <div>
      <div className="profile">
        <h1>Welcome, {user.username}!</h1>
        <p>Email: {user.email}</p>
        <p>Games Played: {user.gamesPlayed}</p>
        <p>Game History: {user.gameHistory}</p>
        {/* <p>Friends: {user.friends}</p> */}
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