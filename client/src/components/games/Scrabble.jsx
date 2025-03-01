import React, { useState }  from 'react';
import axios from 'axios';

const Scrabble = () => {
  const [roomName, setRoomName] = useState('');
  const [numPlayers, setNumPlayers] = useState(0);
  const handleStartScrabble = () => {
    axios.post('/api/scrabble', {
      room_name: roomName,
      players: numPlayers
    })
  }

  return (
    <div>
      <label>Room Name
        <input type="text" placeholder="Enter room name" value={roomName} onChange={(e) => {setRoomName(e.target.value)}} />
      </label>
      <label>Number of Players
        <input type="number" placeholder="Enter number of players" value={numPlayers} onChange={(e) => {setNumPlayers(e.target.value)}} />
      </label>
      <button onClick={handleStartScrabble}>Start Scrabble Game</button>
    </div>
  )
}

export default Scrabble;