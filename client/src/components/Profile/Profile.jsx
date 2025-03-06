import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFriendModal from '../friends/AddFriendModal.jsx';
import axios from 'axios';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';
import { format } from 'date-fns';

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
  const [gameHistory, setGameHistory] = useState([]);
  const [edit, setEdit] = useState(false);
  const [profilePicBlob, setProfilePicBlob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { email } = useVerifyLogin(true);

  useEffect(() => {
    if (email.length > 0) {
      setIsLoading(true);

      Promise.all([
        axios.get(`/api/profile/${email}`),
        axios.get(`/api/gameHistory/${email}`)
      ])
      .then(([profile, history]) => {
        setGameHistory(history.data);
        setUser(profile.data[0]);
        let url = transformBuffer(profile.data[0].profilePic.data.data, profile.data[0].profilePic.contentType);
        setProfilePicBlob(url);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [email]);

  const editView = (
    <div className="mt-2">
      <form>
      <input type="file" accept="image/*" className="file-input" onChange={(e) => {
        handleFileUpload(e.target.files[0]);
      }}/>
      <p className="mt-2">
        <button  type="submit" className="btn btn-sm w-40">Save Changes</button>
      </p>
      </form>
    </div>
  );

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const blob = new Blob([arrayBuffer], { type: file.type });

      const formData = new FormData();
      formData.append('imageBlob', blob, file.name);

      axios.put( `/api/profile/${user._id}/profilePicture`, formData)
        .then(response => {
          let url = transformBuffer(arrayBuffer, file.type)
          setProfilePicBlob(url);
        })
        .catch(error => {
          console.error(error);
        });
      }

    reader.readAsArrayBuffer(file);
    setEdit(false);
  }

  const transformBuffer = (buffer, contentType) => {
    const byteArray = new Uint8Array(buffer);
    const blob = new Blob([byteArray], { type: contentType });
    const url = URL.createObjectURL(blob);
    return url;
  }


  if (user.length === 0 || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
        <h1 className="text-6xl font-bold mb-25">Loading...</h1>
      </div>
    )
  }

  return (
    <div id="profile" className="flex flex-col items-center mt-30">
      <div id="profile-header" className="profile text-center">
        {profilePicBlob ? <img src={profilePicBlob} alt="profile-pic" className="w-50 h-50 mx-auto rounded-full" /> : <img src='https://static-00.iconduck.com/assets.00/profile-circle-icon-512x512-zxne30hp.png' alt="profile-pic" className="w-50 h-50 mx-auto rounded-full" />}
        {edit ? editView : <button className="btn btn-sm mt-2" onClick={() => setEdit(true)}>Edit Profile</button>}
        <h1 className="text-3xl">Welcome, {user.username}!</h1>
      </div>
      <div id="profile-details" className="text-center mt-4">
        <h1 className="text-2xl">Profile Details</h1>
        <p className="text-lg">Email: {user.email}</p>
        <p className="text-lg">Games Played: {gameHistory.length}</p>
        <p className="text-lg">Game History: {user.gameHistory}</p>
        <div className = "flex flex-row flex-wrap gap-2">
        {gameHistory?.length ? (
          gameHistory.map((game) => {
          return (
            <div className = "bg-base-100 rounded-box shadow-md p-4 border-base-200">
              <p>Game: {game.game}</p>
              <p>Game Key: {game.gameKey}</p>
              <p>Date: {format(game.createdAt, 'MM/dd/yyyy')}</p>
              <p>Players: {game.players.join(', ')}</p>
              <p>Winner: {game.winner}</p>
            </div>
          )
          })
        ) : <p>No games played</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;




// friends feature
{/* <div className="friends">
          <button onClick={openFriendModal}>Add Friend By Username</button>
          <AddFriendModal friends={demoUser.friends} />
          {friends !== undefined ? friends.map(friend => (
            <div key={friend.id}>
              <Link to='/profile/:id'>{friends.username}</Link>
            </div>
          )) : null}
        </div> */}