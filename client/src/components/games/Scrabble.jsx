import React, { useState }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const Scrabble = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
  const [dataClone, setDataClone] = useState({});
  const [saveButton, setSaveButton] = useState(false);

  const queryClient = useQueryClient();

  const createGame = async () => {
    const response = await axios.post('/api/scrabble', {
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

  const handleChange = (e, key, playerId) => {
    setSaveButton(true);
    dataClone.players[playerId - 1][key] = e;
  }

  const saveChanges = () => {
    axios.put(`/api/scrabble/${gameKey}`, dataClone)
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
        <h1 className="text-xl font-bold">Scrabble</h1>
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
              <input type="number" placeholder="Enter Number of Players"  min="2" max="5" value={players} onChange={handlePlayers} />
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
    return (
      <div>
        ...LOADING
      </div>
    )
  }


  return (
    <div>
      <h1>{data.room_name}</h1>
      <table className="table table-compact">
        <thead className="border border-primary">
          <tr>
            <th className="text-neutral border border-primary">Player </th>
            <th className="text-neutral border border-primary">Score </th>
          </tr>
        </thead>
        <tbody>
        {data.players.map((player, index) => (
          <tr key={player._id}>
            {/* <td className="border border-primary">{player.name}</td>
            <td className="border border-primary">{player.score}</td> */}

            <td className="border border-primary"><p>{player.name}</p><input className="input w-21" min='0' type='text' placeholder="" onChange={() => handleChange(event.target.value, 'name', player.player_id)}/></td>
            <td className="border border-primary"><p>{player.score}</p><input className="input w-21" min='0' type='number' placeholder="0" onChange={() => handleChange(event.target.value, 'score', player.player_id)}/></td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default Scrabble;