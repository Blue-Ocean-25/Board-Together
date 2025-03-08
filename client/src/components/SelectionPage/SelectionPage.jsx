import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddFriendDropdown from '../friends/AddFriendDropdown.jsx';
import Profile from '../Profile/Profile.jsx';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';

const SelectionPage = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const { email } = useVerifyLogin(false);

  useVerifyLogin(true);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(e.target.value);
  }

  const handleDelete = (event) => {
    var sessionId = event.target.value;
    axios.delete(`/api/profile/${email}/${sessionId}`)
      .then(() => {
        console.log('successfully deleted game session')
        setSessions(sessions.filter(session => session !== sessionId));
      })
  }

  useEffect(() => {
    setIsLoading(true);
    if (email.length > 0) {
      axios.get(`api/profile/${email}`)
      .then((res) => {
        setSessions(res.data[0].gamesInProgress);
      })
      .finally(() => setIsLoading(false));
    }
  }, [email]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-300">
        <h1 className="text-6xl font-bold mb-25">Loading...</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center mt-40">
      <img
            src="https://cdn-icons-png.flaticon.com/512/3351/3351767.png"
            alt="Dice"
            className="fixed left-[-100px] bottom-[-100px] w-100 h-100 opacity-30 mix-blend-multiply"
          />
      <div className="relative z-99 gameSelection flex flex-col items-center">
        <h1 className="relative z-99 text-3xl mb-20 font-bold">Choose a game:</h1>
        <div className="flex justify-between w-full max-w-md mb-10">
          <Link className="btn btn-lg btn-accent mx-6 " id="clue" to='/clue'>Clue</Link>
          <Link className="btn btn-lg btn-accent mx-6" id="yahtzee" to='/yahtzee'>Yahtzee</Link>
          <Link className="btn btn-lg btn-accent mx-6" id="scrabble" to='/scrabble'>Scrabble</Link>
        </div>
      </div>
      <div className="divider mt-10 mb-10" />
      <h1 className="text-3xl mb-10 font-bold">Games in Progress:</h1>
      <ul className="list bg-base-100 rounded-box shadow-md mt-10">
        {sessions?.length ? (
          sessions.map((session, index) => (
            <li className="list-row flex justify-between" key={index}>
              <div className=''>
                <h3 className="text-xl mr-40" value = {session}>{session}</h3>
              </div>
              <div className="flex flex-row justify-end gap-2">
                <button className="btn btn-accent join-item" value={session.split(' ')[1]} onClick={copyToClipboard}>Copy To Clipboard</button>
                <button className="btn btn-secondary join-item" value={session} onClick={handleDelete}>Delete</button>
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
