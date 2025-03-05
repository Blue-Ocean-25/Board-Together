import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';

const Yahtzee = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
  const [saveButton, setSaveButton] = useState(false);
  const [dataClone, setDataClone] = useState({});

  const queryClient = useQueryClient();

  const handlePlayers = (e) => {
    const value = e.target.value;
    if (value < 1 || value > 5) {
      return;
    }
    setPlayers(value);
  }

  const createGame = async () => {
    const response = await axios.post('/api/yahtzee', {
      room_name: roomName,
      players: players
    });
    setGameKey(response.data._id);
    return response.data;
  }

  const joinGame = () => {
    Swal.fire({
      title: 'Enter Room Key',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Join',
      showLoaderOnConfirm: true,
    }).then((result) => {
      setGameKey(result.value);
    });
  }

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      queryClient.setQueryData(['yahtzeeState'], data);
    }
  })

  const fetchGame = () => {
    if (!gameKey) {
      return null;
    }
    return axios.get(`/api/yahtzee/${gameKey}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    })
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['yahtzeeState'],
    queryFn: fetchGame,
    refetchInterval: 1000
  });

  const handleChange = (e, key, playerId) => {
    setSaveButton(true);
    dataClone.players[playerId - 1][key] = e;
  }

  const saveChanges = () => {
    axios.put(`/api/yahtzee/${gameKey}`, dataClone)
    .then((res) => {
      setSaveButton(false);
      setDataClone(res.data);
      const input = document.querySelectorAll('.input');
      input.forEach((element) => {
        element.value = '';
      });
    })
    .catch((err) => console.error(err));
  }


  if (JSON.stringify(dataClone) === '{}' && data) {
    setDataClone(data);
  }

  if (!gameKey) {
    return (
      <div className="bg-base-300 flex-col justify-items-center content-center w-screen h-screen">
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
              <input type="number" placeholder="Enter Number of Players"  min="" max="5" value={players} onChange={handlePlayers} />
            </label>
          </div>
          <div className="pt-4 pb-4">
            <button className="btn btn-md btn-accent shadow-lg w-43" onClick={() => mutation.mutate()}>Start Game</button>
            <div className="divider">OR</div>
            <button className="btn btn-md btn-accent shadow-lg w-43" onClick={joinGame}>Join Game</button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return <div>...Loading</div>;
  }



  const upperScoreSheet = (
      <div>
        <table className="table table-compact">
          <caption className="font-bold text-primary text-lg/7 underline">Upper Section</caption>
          <thead>
            <tr className="border border-primary">
              <th className="border border-primary"></th>
              <th className="text-neutral border border-primary">Aces</th>
              <th className="text-neutral border border-primary">Twos</th>
              <th className="text-neutral border border-primary">Threes</th>
              <th className="text-neutral border border-primary">Fours</th>
              <th className="text-neutral border border-primary">Fives</th>
              <th className="text-neutral border border-primary">Sixes</th>
            </tr>
          </thead>
          <tbody>
            {data.players.map((player, index) => {
              return (
                <tr key={player._id} className="border border-primary">
                  <th><p>{player.player_name}</p><input className="input ml-3 w-43" type="text" placeholder="edit player name" onChange={() => {handleChange(event.target.value, 'player_name', player.player_id)}}/></th>
                  <td className="border border-primary"><p>{player.aces}</p><input className="input w-21" min='0' max='5' type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'aces', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.twos}</p><input className="input w-21" min='0' max='10'  type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'twos', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.threes}</p><input className="input w-21" min='0' max='15'  type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'threes', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.fours}</p><input className="input w-21" min='0' max='20'  type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'fours', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.fives}</p><input className="input w-21" min='0' max='25'  type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'fives', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.sixes}</p><input className="input w-21" min='0' max='30'  type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'sixes', player.player_id)}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );


  const lowerScoreSheet = (
      <div>
        <table className="table table-compact">
          <caption className="font-bold text-primary text-lg/7 underline">Lower Section</caption>
          <thead>
            <tr className="text-neutral border border-primary">
              <th className="text-neutral border border-primary"></th>
              <th className="text-neutral border border-primary">3 of a Kind</th>
              <th className="text-neutral border border-primary">4 of a Kind</th>
              <th className="text-neutral border border-primary">Full House</th>
              <th className="text-neutral border border-primary">Small Straight</th>
              <th className="text-neutral border border-primary">Large Straight</th>
              <th className="text-neutral border border-primary">Yahtzee</th>
              <th className="text-neutral border border-primary">Chance</th>
              <th className="text-neutral border border-primary">Yahtzee Bonus</th>
            </tr>
          </thead>
          <tbody className="border border-primary">
            {data.players.map((player, index) => {
              return (
                <tr key={player._id} className="border border-primary">
                  <th className="w-250">{player.player_name}</th>
                  <td className="border border-primary"><p>{player.three_of_a_kind}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => {handleChange(event.target.value, 'three_of_a_kind', player.player_id)}}/></td>
                  <td className="border border-primary"><p>{player.four_of_a_kind}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'four', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.full_house}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'full_house', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.small_straight}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'small_straight', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.large_straight}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'large_straight', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.yahtzee}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'yahtzee', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.chance}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'chance', player.player_id)}/></td>
                  <td className="border border-primary"><p>{player.yahtzee_bonus}</p><input className="input w-21" type="number" min="0" placeholder="0" onChange={() => handleChange(event.target.value, 'yahtzee_bonus', player.player_id)}/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );

  return (
    <div className="mt-20">
      <h1 className="text-primary font-black text-xl/10 tracking-widest underline">Yahtzee</h1>
      <div>
        <span className="text-primary font-bold text-lg/7">Shareable Room Key: </span>
        <span className="font-bold text-lg/7 underline">{data._id}</span>
      </div>
      <div>
        <h2 className="text-primary font-bold text-lg/7">Room Name: {data.room_name}</h2>
        <div className="max-w-7xl mx-auto border-6 border-primary rounded-box p-4">
          <div>
            {upperScoreSheet}
          </div>
          <div className="divider bg-primary -ml-4 -mr-4"></div>
          <div>
            {lowerScoreSheet}
          </div>
          {saveButton ? <div><button className="btn btn-md btn-accent shadow-lg w-43" onClick={saveChanges}>Save Changes</button></div> : null}
        </div>
      </div>
    </div>
  );
};

export default Yahtzee;



