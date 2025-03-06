import React, { useState }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import WinnerModal from './WinnerModal.jsx';
import Swal from 'sweetalert2';
import axios from 'axios';
import MessageBoard from './messages/MessageBoard.jsx';
import gameNotFound from './../utils/gameNotFound.js';
import { useNavigate } from 'react-router-dom';

const Scrabble = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
  const [dataClone, setDataClone] = useState({});
  const [saveButton, setSaveButton] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePlayers = (e) => {
    const value = e.target.value;
    if (value < 1 || value > 5) {
      return;
    }
    setPlayers(value);
  }


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
      background: "#ffdba6",
        customClass: {
          popup: 'bg-base-200 text-base-content rounded-lg shadow-xl',
          icon: 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-base-100 mt-5',
          title: 'text-lg font-bold text-center mt-3',
          htmlContainer: 'text-sm text-gray-500 mt-2 text-center',
          confirmButton: 'btn-lg btn-accent',
        },
    }).then((result) => {
      if (result.value) {
        setGameKey(result.value);
      }
    })
  }


  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      //console.log('mutate data: ', data);
      queryClient.setQueryData(['scrabbleState'], data);

    }
  })

  const fetchGame = () => {
    if (!gameKey) {
      throw new Error;
    }
    return axios.get(`/api/scrabble/${gameKey}`)
    .then((res) => {
      // console.log('GET DATA: ', res.data);
      return res.data;
    })
    .catch((err) => {
      setGameKey('');
      setInvalid(true);
      throw new Error;
    })
  }


  const { data, isLoading, error } = useQuery({
    queryKey: ['scrabbleState'],
    queryFn: fetchGame,
    retry: 0,
    refetchInterval: (query) => {
      // if (query.state.error) {
      //   return false;
      // } else {
      //   return 1000;
      // }
      return 1000;
    },
  });


  const handleChangeName = (e, key, playerId) => {
    setSaveButton(true);
    dataClone.players[playerId - 1][key] = e;
  }

  const handleChangeScore = (e, key, playerId) => {
    setSaveButton(true);
    dataClone.players[playerId - 1][key] = data.players[playerId - 1][key] + e;
  }

  const handleCompleteGame = () => {
    document.getElementById('winner_modal').showModal()
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

  if (invalid) {
    setInvalid(false);
    gameNotFound();
  }

  if (data?.er) {
    console.log('error')
    return 'Error';
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
      <div>...LOADING</div>
    )
  }


  return (
    <div className="mt-20">
      <h1 className="text-primary font-black text-xl/10 tracking-widest underline">Scrabble</h1>
      <div className="pb-16">
        <span className="text-primary font-bold text-lg/7">Shareable Room Key: </span>
        <span className="font-bold text-lg/7 underline">{data._id}</span>
      </div>
      <div className="max-w-7xl mx-auto border-6 border-primary rounded-box p-4">
      <table className="table table-compact">
        <caption>Scrabble Scorecard</caption>
        <thead className="border border-primary">
          <tr className="text-neutral border border-primary">
            <th className="text-neutral border border-primary">Player </th>
            <th className="text-neutral border border-primary">Score </th>
          </tr>
        </thead>
        <tbody>
        {data.players.map((player, index) => (
          <tr key={player._id} className="text-neutral border border-primary">
            {/* <td className="border border-primary">{player.name}</td>
            <td className="border border-primary">{player.score}</td> */}

            <td className="border border-primary"><p>{player.name}</p><input className="input w-21" min='0' type='text' placeholder="" onChange={() => handleChangeName(event.target.value, 'name', player.player_id)}/></td>
            <td className="border border-primary"><p>{player.score}</p><input className="input w-21"  type='number' placeholder="0" onBlur={() => handleChangeScore(Number(event.target.value), 'score', player.player_id)}/><span onClick={saveChanges}>add to score</span></td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      <WinnerModal players = {data.players.map((player) => {return player.name})} gameKey = {gameKey} game = {"Scrabble"}/>
      <div className={saveButton ? "flex flex-row gap-4 justify-between m-2" : "flex flex-row gap-4 justify-end m-2"}>
        {saveButton ? <div><button className="btn btn-md btn-accent shadow-lg w-43" onClick={saveChanges}>Save Changes</button></div> : null}
        <button className="btn btn-md btn-accent shadow-lg w-43" onClick={handleCompleteGame}>Complete Game</button>
      </div>
      <MessageBoard gameId={gameKey}/>
    </div>
  )
}

export default Scrabble;