const mongoose = require('mongoose');
const express = require('express');
const { YahtzeeSession, YahtzeePlayer } = require('../../db/models/games/yahtzee');

const makeYahtzee = async (req, res) => {
  const { room_name, players } = req.body;

  let newPlayers = Array.from({ length: players }, (_, index) => ({
    player_id: index + 1,
  }));

  const newGame = new YahtzeeSession({
    room_name: room_name,
    players: newPlayers,
  });

  newGame.save()
    .then((game) => {
      res.status(201).send(game);
    })
    .catch((err) => res.status(500).send(err));
}


const getYahtzeeGame = async (req, res) => {
  const { gameKey } = req.params;
  const gameState = await YahtzeeSession.findOne({ _id: gameKey });
  res.status(200).send(gameState);
}

const updateYahtzeeGame = async (req, res) => {
  console.log('BODY: ', req.body, 'PARAMS:  ', req.params);
  const { gameKey } = req.params;
  const { players } = req.body;

  try {
    const game = await YahtzeeSession.findOne({ _id: gameKey });
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


module.exports = { makeYahtzee, getYahtzeeGame, updateYahtzeeGame };