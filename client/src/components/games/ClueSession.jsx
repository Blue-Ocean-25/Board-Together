import React, { useState, useRef }  from 'react';
import { useQuery } from '@tanstack/react-query';
import ClueCard from "./ClueCard.jsx";

export default function ClueSession({data}) {
  const [playerId, setPlayerId] = useState('');

  const handlePlayerChange = (event) => {
    if (!event.target.value === "no player selected") {
      setPlayerId(Number(event.target.value));
    }
  };

  return (
    <>
    <div>
      <select id="player-select" onChange={handlePlayerChange} value={playerId}>
        <option value={"no player selected"}>Please Select a Board:</option>
        {data.players.map((player, index) => (<option value={index}>{player.player_id}</option>))}
      </select>
    </div>
    {
      playerId !== '' && <ClueCard playerData={data.players[playerId]} gameSession={data._id} />
    }

    </>
  )
}
