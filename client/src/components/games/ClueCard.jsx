import React, { useState, useRef }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function ClueCard({ playerData, gameSession }) {
  const queryClient = useQueryClient();

  const updateGame = async ([category, name]) => {
    const res = await axios.put(`/api/clue/${gameSession}`, {
      playerId: playerData.player_id,
      category,
      name
    });
    return res.data;
  }

  const mutation = useMutation({
    mutationFn: updateGame,
    onSuccess: (data) => {
      queryClient.setQueryData(['scrabbleState'], data);
    }
  })

  const handleChange = (e) => {
    mutation.mutate([e.target.dataset.category, e.target.dataset.name]);
  }

  const updateName = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const res = await axios.put(`/api/clue/${gameSession}/${playerData.player_id}`, {
      playerName: username,
    });
    return res.data;
  }

  const mutationName = useMutation({
    mutationFn: updateName,
    onSuccess: (data) => {
      queryClient.setQueryData(['scrabbleState'], data);
    }
  })

  return (
  <div>
    <div className="pt-4 pb-4">
      <form onSubmit={(e) => mutationName.mutate(e)}>
        <input id="setName" className="input input-accent shadow-lg w-43" placeholder="Set your Username"/>
        <button className="btn btn-md btn-accent shadow-lg w-43" type="submit">Set Name</button>
      </form>
    </div>
      <div>
      <table id="suspects" className="table">
        <thead>
          <tr>
            <th>Suspects</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(playerData.suspects).map(([suspect,value]) => (
          <tr>
            <td>
            <input type="checkbox" className="checkbox" name={suspect} checked={value} data-category='suspects' data-name={suspect} onChange={(e) => handleChange(e)} /><span className="ml-4">{suspect}</span>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <table id="weapons" className="table">
        <thead>
          <tr>
            <th>Weapons</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(playerData.weapons).map(([weapon, value]) => (
          <tr>
            <td>
            <input type="checkbox" className="checkbox" name={weapon} checked={value} data-category='weapons' data-name={weapon} onChange={(e) => handleChange(e)} /><span className="ml-4">{weapon}</span>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div>
      <table id="rooms" className="table">
        <thead>
          <tr>
            <th>Rooms</th>
          </tr>
        </thead>
        <tbody>
        {Object.entries(playerData.rooms).map(([room, value]) => (
          <tr>
            <td>
            <input type="checkbox" className="checkbox" name={room} checked={value} data-category='rooms' data-name={room} onChange={(e) => handleChange(e)} /><span className="ml-4">{room}</span>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>

    </div>
  )
}
