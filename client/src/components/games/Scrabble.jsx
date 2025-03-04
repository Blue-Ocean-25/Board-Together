import React, { useState }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Scrabble = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
  const queryClient = useQueryClient();

  const createGame = async () => {
    const response = await axios.post('/api/scrabble', {
      room_name: roomName,
      players: players
    });
    setGameKey(response.data._id);
    return response.data;
  }

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      console.log('mutate data: ', data);
      queryClient.setQueryData(['scrabbleState'], data);

    }
  })

  const fetchGame = () => {
    if (!gameKey) {
      return null;
    }
    return axios.get(`/api/scrabble/${gameKey}`)
    .then((res) => {
      console.log('GET DATA: ', res.data);
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    })
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['scrabbleState'],
    queryFn: fetchGame,
    refetchInterval: 1000
  });

  if (!gameKey) {
    return (
      <div className="bg-base-300 flex-col justify-items-center pt-4 pb-4 w-screen h-screen">
        <h1 className="text-2xl font-bold">Scrabble</h1>
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
            <button className="btn btn-md btn-accent shadow-lg w-43" onClick={() => mutation.mutate()}>Start Game</button>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div>
      <h1>{data ? data.room_name : '...LOADING'}</h1>
      <table className="table table-compact">
        <thead>
          <tr>
            <th>name </th>
            <th>score </th>
          </tr>
        </thead>
        <tbody>
        {data.players.map((player, index) => (
          <tr key={player._id}>
            <td>{player.name}</td>
            <td>{player.score}</td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Scrabble;