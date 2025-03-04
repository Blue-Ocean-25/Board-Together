import React, { useState, useRef }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClueSession from "./ClueSession.jsx";
import axios from 'axios';


const Clue = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
  const queryClient = useQueryClient();

  const createGame = async () => {
    const response = await axios.post('/api/clue', {
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
      queryClient.setQueryData(['clueState'], data);
    }
  })

  const fetchGame = () => {
    if (!gameKey) {
      return null;
    }
    return axios.get(`/api/clue/${gameKey}`) // :c :( D:
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['clueState'],
    queryFn: fetchGame,
    refetchInterval: 1000
  });

  if (!gameKey) {
    return (
      <div className="bg-base-300 flex-col justify-items-center pt-4 pb-4 w-screen h-screen">
        <h1 className="text-xl font-bold">Clue</h1>
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
          <button onClick={() => mutation.mutate()} className="btn btn-md btn-accent shadow-lg w-43">Start Game</button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div>
        ...LOADING
      </div>
    )
  }

  return (
    <>
      <div>
        <h1>{data.room_name}</h1>
        {data.players.map((player, index) => <div key={player._id}>{player.name}</div>)}
      </div>
      <div>
        <ClueSession data={data}/>
      </div>
    </>
  )


}

export default Clue;