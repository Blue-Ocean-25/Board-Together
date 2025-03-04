import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Yahtzee = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
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

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      queryClient.setQueryData(['yahtzeeState'], data);
    }
  })

  const updateGame = (game_id, player_id, score) => {
    axios.put(`/api/yahtzee/${game_id}`, {
      player_id: player_id,
      score: score
    })
    .then((res) => {
      queryClient.setQueryData(['yahtzeeState'], res.data);
    })
    .catch((err) => console.error(err));
  }

  const fetchGame = () => {
    if (!gameKey) {
      return null;
    }
    return axios.get(`/api/yahtzee/${gameKey}`)
    .then((res) => {
      console.log('GET DATA: ', res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    })
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['yahtzeeState'],
    queryFn: fetchGame,
    // refetchInterval: 1000
  });


  if (!gameKey) {
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
              <input type="number" placeholder="Enter Number of Players"  min="1" max="5" value={players} onChange={handlePlayers} />
            </label>
          </div>
          <div className="pt-4 pb-4">
            <button className="btn btn-md btn-accent shadow-lg w-43" onClick={() => mutation.mutate()}>Start Game</button>
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
          <caption>Upper Section</caption>
          <thead>
            <tr>
              <th></th>
              <th>Aces</th>
              <th>Twos</th>
              <th>Threes</th>
              <th>Fours</th>
              <th>Fives</th>
              <th>Sixes</th>
            </tr>
          </thead>
          <tbody>
            {data.players.map((player, index) => {
              return (
                <tr key={player._id}>
                  <th><input className="input" type="text" defaultValue={player.player_name}/></th>
                  <td>{player.aces}</td>
                  <td>{player.twos}</td>
                  <td>{player.threes}</td>
                  <td>{player.fours}</td>
                  <td>{player.fives}</td>
                  <td>{player.sixes}</td>
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
          <caption>Lower Section</caption>
          <thead>
            <tr>
              <th></th>
              <th>3 of a Kind</th>
              <th>4 of a Kind</th>
              <th>Full House</th>
              <th>Small Straight</th>
              <th>Large Straight</th>
              <th>Yahtzee</th>
              <th>Chance</th>
              <th>Yahtzee Bonus</th>
            </tr>
          </thead>
          <tbody>
            {data.players.map((player, index) => {
              return (
                <tr key={player._id}>
                  <th>{player.player_name}</th>
                  <td>{player.three_of_a_kind}</td>
                  <td>{player.four_of_a_kind}</td>
                  <td>{player.full_house}</td>
                  <td>{player.small_straight}</td>
                  <td>{player.large_straight}</td>
                  <td>{player.yahtzee}</td>
                  <td>{player.chance}</td>
                  <td>{player.yahtzee_bonus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
  );

  return (
    <div>
      <h1>Yahtzee</h1>
      <h3>Shareable Room Key: {data._id}</h3>
      <div>
        <h2>Room Name: {data.room_name}</h2>
        <div>
          {upperScoreSheet}
        </div>
        <div className="divider"></div>
        <div>
          {lowerScoreSheet}
        </div>
      </div>
    </div>
  );
};

export default Yahtzee;



