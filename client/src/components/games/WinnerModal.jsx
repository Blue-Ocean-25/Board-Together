import React, { useState } from 'react';
import axios from 'axios';
import useVerifyLogin from '../utils/useVerifyLogin.jsx';

const WinnerModal = ({players, gameKey, game}) => {

  const [winner, setWinner] = useState('Select Winner');

  const { email } = useVerifyLogin();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('api/gameHistory', {
      winner: winner,
      players: players,
      gameKey: gameKey,
      email: email,
      game: game
    })
    axios.delete(`api/profile/${email}/${game}: ${gameKey}`)
    document.getElementById('winner_modal').close()

  }

  const handleClose = () => {
    document.getElementById('winner_modal').close()
  }

  return (
    <dialog id="winner_modal" className="modal">
      <div className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick = {handleClose}>✕</button>
        <form method="dialog" onSubmit = {handleSubmit} className="flex flex-col gap-4">
          {/* if there is a button in form, it will close the modal */}
          <select className = "select select-accent" value={winner} onChange = {(e) => {setWinner(e.target.value)}}>
            <option>Select Winner</option>
            {players.map((player, index) => {
              return <option value = {player} key = {index}>{player}</option>
            })}
          </select>
          <button type="submit" className="btn btn-md btn-accent shadow-lg w-43">Submit</button>
        </form>
      </div>
    </dialog>
  )
}

export default WinnerModal;