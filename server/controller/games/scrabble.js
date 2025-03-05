const mongoose = require('mongoose');
const express = require('express');
const { ScrabbleSession, ScrabblePlayer } = require('../../db/models/games/scrabble');

const makeScrabble = async (req, res) => {
  const { room_name, players } = req.body;

  let newPlayers = Array.from({ length: players }, (_, index) => ({
    player_id: index + 1,
  }));

  const newGame = new ScrabbleSession({
    room_name: room_name,
    players: newPlayers,
  });

  newGame.save()
    .then((game) => {
      res.status(201).send(game);
    })
    .catch((err) => res.status(500).send(err));
}

const getScrabbleGame = async (req, res) => {
  const { gameKey } = req.params;
  const gameState = await ScrabbleSession.findOne({ _id: gameKey });
  res.status(200).send(gameState);
}

const updateScrabbleGame = async (req, res) => {
  const { gameKey } = req.params;
  const { players } = req.body;

  try {
    const game = await ScrabbleSession.findOne({ _id: gameKey });
    if (!game) {
      res.status(404).send('Game not found');
    }
    game.players = players;
    await game.save();
    res.status(200).send(game);
  } catch (err) {
    res.status(500).send('Server Error: ', err);
  }
}



module.exports = { makeScrabble, getScrabbleGame,updateScrabbleGame};