import React, { useState, useRef }  from 'react';
import axios from 'axios';


const Clue = () => {
  const roomNameRef = useRef(null);
  const playersRef = useRef(null);

  const handleClick = () => {
    const room_name = roomNameRef.current.value;
    const players = playersRef.current.value;

    axios.post("/api/clue", {
      room_name: room_name,
      players: players
    })
    .then(res => {
      console.log("Clue session created:", res.data);
    })
    .catch(err => {
      console.error("There was an error creating the Clue Session!", err);
    })
  }

  return (
  <div className="bg-base-100">
    <button onClick={handleClick} className="btn btn-sm btn-primary">Create Clue</button>
    <select className="select" name="players" id="players" ref={playersRef}>
      <option value={2}>2</option>
      <option value={3}>3</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
      <option value={6}>6</option>
    </select>
    <label htmlFor="room_name">Enter a room name:</label>
    <input className="input" id="room_name" ref={roomNameRef}></input>
  </div>
  )
}

export default Clue;