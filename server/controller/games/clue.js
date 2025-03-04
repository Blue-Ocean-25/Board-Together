const mongoose = require('mongoose');
const express = require('express');

const { ClueSession, CluePlayer } = require('../../db/models/games/clue');

const makeClue = async (req, res) => {
  // req.body should contain the room_name, players
  const { room_name, players } = req.body;
    let newPlayers = Array.from({ length: players }, (_, index) => ({
      player_id: index + 1,
    }));

    let newSession = new ClueSession({
      room_name: room_name,
      players: newPlayers,
    })

    newSession.save()
      .then((game) => {
        res.status(201).send(game);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send(err)
      });
}

const getClueGame = async (req, res) => {
  const { gameKey } = req.params;
  const gameState = await ClueSession.findOne({ _id: gameKey });
  res.status(200).send(gameState);
}

module.exports = { makeClue, getClueGame };