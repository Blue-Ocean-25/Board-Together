import React, { useState, useRef }  from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClueSession from "./ClueSession.jsx";
import axios from 'axios';
import MessageBoard from './messages/MessageBoard.jsx';
import Swal from 'sweetalert2';
import gameNotFound from './../utils/gameNotFound.js';
import useVerifyLogin from './../utils/useVerifyLogin.jsx';

const Clue = () => {
  const [roomName, setRoomName] = useState('');
  const [players, setPlayers] = useState(1);
  const [gameKey, setGameKey] = useState('');
  const queryClient = useQueryClient();
  const [invalid, setInvalid] = useState(false);
  const { email } = useVerifyLogin(false);

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
        mutationFind.mutate(result.value);
      });
    }

  const createGame = async () => {
    if (players < 1 || players > 5) {
      return;
    }
    const response = await axios.post('/api/clue', {
      room_name: roomName,
      players: players,
      email
    });
    setGameKey(response.data._id);
    return response.data;
  }

  const findGame = async (gkey) => {
    const response = await axios.get(`/api/clue/${gkey}`).then((data) => {
      setGameKey(data._id);
      return data
    })
    .catch((err) => {
      setInvalid(true);
      throw new Error;
    })
    return response.data;
  }

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: (data) => {
      queryClient.setQueryData(['clueState'], data);
    }
  })

  const mutationFind = useMutation({
    mutationFn: findGame,
    onSuccess: (data) => {
      queryClient.setQueryData(['clueState'], data);
    }
  })

  const fetchGame = () => {
    if (!gameKey) {
      return null;
    }
    return axios.get(`/api/clue/${gameKey}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      setInvalid(true);
      throw new Error;
    })
  }
  if (invalid) {
    setInvalid(false);
    gameNotFound();
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['clueState'],
    queryFn: fetchGame,
    retry: 0,
    refetchInterval: 1000
  });

  if (!gameKey) {
    return (
      <div data-testid="clue-start" className="bg-base-300 flex-col justify-items-center pt-4 pb-4 w-screen h-screen content-center">
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
          <div className="divider">OR</div>
          <button className="btn btn-md btn-accent shadow-lg w-43" onClick={joinGame}>Join Game</button>
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
      <div className="mt-20">
        <h1>{data.room_name}</h1>
        <h2><span className="font-bold">Share this key to invite friends:</span> {gameKey}</h2>
        {data.players.map((player, index) => <div key={player._id}>{player.name}</div>)}
      </div>
      <div>
        <ClueSession data={data}/>
        <MessageBoard gameId={gameKey}/>
      </div>
    </>
  )


}

export default Clue;