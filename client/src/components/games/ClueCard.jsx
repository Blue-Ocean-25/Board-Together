import React, { useState, useRef }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import WinnerModal from './WinnerModal.jsx';
import axios from 'axios';

export default function ClueCard({ data, playerData, gameSession }) {
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
      queryClient.setQueryData(['clueState'], data);
    }
  })

  const handleChange = (e) => {
    mutation.mutate([e.target.dataset.category, e.target.dataset.name]);
  }

  const handleCompleteGame = () => {
    document.getElementById('winner_modal').showModal()
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
      queryClient.setQueryData(['clueState'], data);
    }
  })

  return (
    <div data-testid="clue-card-test" className="flex-row">
    <div className="pt-4 pb-4 flex flex-row gap-4 w-full">
      <form data-testid="change-name-test" onSubmit={(e) => mutationName.mutate(e)} className="w-full flex flex-row gap-4">
        <input id="setName" className="input input-accent shadow-lg w-43" placeholder="Set your Username" />
        <button className="btn btn-md btn-accent shadow-lg w-43" type="submit">Set Name</button>
      </form>
      <button onClick={handleCompleteGame} className="btn btn-md btn-accent shadow-lg w-43">Complete Game</button>
    </div>

    <div className="flex flex-row gap-4 w-full justify-between max-w-7xl mx-auto border-6 border-primary rounded-box p-4">
      <div className="flex-1 ">
        <table id="suspects" className="table w-full table-compact">
          <thead className="font-bold text-primary text-lg/7 underline">
            <tr className="border border-primary">
              <th className="text-neutral border border-primary" >Suspects</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(playerData.suspects).map(([suspect, value]) => (
              <tr key={suspect} className="border border-primary">
                <td className="border border-primary">
                  <input data-testid={`${suspect}-test`} type="checkbox" className="checkbox" name={suspect} checked={value} data-category="suspects" data-name={suspect} onChange={(e) => handleChange(e)} />
                  <span className="ml-4">{suspect}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex-1 ">
        <table id="weapons" className="table w-full table-compact">
          <thead className="font-bold text-primary text-lg/7 underline">
            <tr className="border border-primary">
              <th className="text-neutral border border-primary" >Weapons</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(playerData.weapons).map(([weapon, value]) => (
              <tr key={weapon} className="border border-primary">
                <td className="border border-primary">
                  <input type="checkbox" className="checkbox" name={weapon} checked={value} data-category="weapons" data-name={weapon} onChange={(e) => handleChange(e)} />
                  <span className="ml-4">{weapon}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex-1 ">
        <table id="rooms" className="table w-full table-compact">
          <thead className="font-bold text-primary text-lg/7 underline">
            <tr className="border border-primary">
              <th className="text-neutral border border-primary" >Rooms</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(playerData.rooms).map(([room, value]) => (
              <tr key={room} className="border border-primary">
                <td className="border border-primary">
                  <input type="checkbox" className="checkbox" name={room} checked={value} data-category="rooms" data-name={room} onChange={(e) => handleChange(e)} />
                  <span className="ml-4">{room}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <WinnerModal players={data.players.map((player) => player.player_id)} gameKey={gameSession} game={"Clue"} />
  </div>
  )
}
