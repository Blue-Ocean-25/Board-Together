import React, { useState } from 'react';
import axios from 'axios';

const Yahtzee = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(0);

  const makeNewGame = () => {
    axios.post(('/api/yahtzee'), {room_name:roomName, players:players})
    .then((data) => {
      console.log(data);//delete this later
    })
  }

  return (
    <div className="bg-neutral">
      <label className="input">
        <span className="label">Room Name</span>
        <input type="text" placeholder="Enter Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      </label>
      <label className="input">
        <span className="label">Number of Players</span>
        <input type="number" placeholder="Enter Number of Players"  min="0" max="5" value={players} onChange={(e) => setPlayers(e.target.value)} />
      </label>
      <button className="btn btn-sm bg-secondary" onClick={() => makeNewGame()}>Start Yahtzee Game</button>
    </div>
  );
};

export default Yahtzee;


