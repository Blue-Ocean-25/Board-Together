import React, { useState, useRef }  from 'react';
import { useQuery } from '@tanstack/react-query';
import ClueCard from "./ClueCard.jsx";

export default function ClueSession({data}) {
  const [playerId, setPlayerId] = useState('');

  const handlePlayerChange = (event) => {
    setPlayerId(Number(event.target.value));
  };


  console.log('data: ', data);

  return (
    <>
    <div>
      <h1>Yahtzee</h1>
      <h3>Shareable Room Key: {data._id}</h3>
      <div>
        <h2>Room Name: {data.room_name}</h2>
        <div>
          <div>
            <select id="player-select" onChange={handlePlayerChange} value={playerId}>
              {data.players.map((player, index) => (<option value={index}>{player.player_id}</option>))}
            </select>
          </div>
        </div>
      </div>
    </div>
    {
      playerId && <ClueCard playerData={data.players[playerId]} />
    }

    </>
  )
}
