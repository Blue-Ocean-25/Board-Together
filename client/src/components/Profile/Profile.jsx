import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';


const Profile = ({ friends, setFriends }) => {
  const [user, setUser] = useState([]);
  const { email } = useVerifyLogin(true);
  // const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (email.length > 0) {
      axios.get(`/api/profile/${email}`)
        .then((results) => {
          setUser(results.data[0]);
          setFriends(results.data[0].friends);
        }).catch((err) => {
          console.error(err);
        });
    }
  }, [email]);

  const handleDelete = async (friendName) => {
    try {
      await axios.put('/api/profile/deleteFriend', { email, friendName });
      setFriends((prev) => prev.filter((friend) => friend !== friendName));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div id="profile" className="flex flex-col items-center mt-30">
      <div id="profile-header" className="profile text-center">
        <img src="https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png" alt="profile-pic" className="w-50 h-50 mx-auto" />
        <h1 className="text-3xl">Welcome, {user.username}!</h1>
      </div>
      <div id="profile-details" className="text-center mt-4">
        <h1 className="text-2xl">Profile Details</h1>
        <p className="text-lg">Email: {user.email}</p>
        <p className="text-lg">Games Played: {user.gamesPlayed}</p>
        <p className="text-lg">Game History: {user.gameHistory}</p>
      </div>
      <div className='divider'></div>
      <h3>Friends List</h3>
      {friends?.length > 0 ? (friends.map((friend, index) => (
        <div key={index}>
          <Link to='/profile'>{friend}</Link>
          <button
            className='btn btn-ghost btn-circle'
            onClick={() => handleDelete(friend)}
          >Delete</button>
        </div>
      ))) : (
        <p>No Friends Found</p>
      )}
    </div>
  );
};

export default Profile;




