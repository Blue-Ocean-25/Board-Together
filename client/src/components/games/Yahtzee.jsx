import React, { useState } from 'react';
import axios from 'axios';

const Yahtzee = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);

  const makeNewGame = () => {
    axios.post(('/api/yahtzee'), {room_name:roomName, players:players})
    .then((data) => {
      console.log(data);//delete this later
    })
  }

  return (
    <div className="bg-base-300 flex-col justify-items-center pt-4 pb-4 w-screen h-screen">
      <h1 className="text-xl font-bold">Yahtzee</h1>
      <div className="bg-base-200 flex-col justify-items-center p-2 shadow-lg w-96 rounded-box border-2 border-base-100">
        <div className="pt-4">
          <label className="input w-86">
            <span className="label">Room Name</span>
            <input type="text" placeholder="Enter Room Name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
          </label>
        </div>
        <div className="pt-4">
          <label className="input w-86">
            <span className="label">Number of Players</span>
            <input type="number" placeholder="Enter Number of Players"  min="1" max="5" value={players} onChange={(e) => setPlayers(e.target.value)} />
          </label>
        </div>
        <div className="pt-4 pb-4">
          <button className="btn btn-md btn-accent shadow-lg w-43" onClick={() => makeNewGame()}>Start Game</button>
        </div>
      </div>
    </div>
  );
};

export default Yahtzee;