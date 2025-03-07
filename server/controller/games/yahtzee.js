const mongoose = require('mongoose');
const express = require('express');
const { YahtzeeSession, YahtzeePlayer } = require('../../db/models/games/yahtzee');
const User =  require('../../db/models/profile/profile.js');

const makeYahtzee = async (req, res) => {
  const { room_name, players, email } = req.body;

  let newPlayers = Array.from({ length: players }, (_, index) => ({
    player_id: index + 1,
  }));

  const newGame = new YahtzeeSession({
    room_name: room_name,
    players: newPlayers,
  });

  newGame.save()
    .then((game) => {
      User.updateOne({email}, {$push: {gamesInProgress: `Yahtzee: ${JSON.parse(JSON.stringify(game._id))}`}})
      .then((result) => {
        res.status(201).send(game);
      })
      .catch((err) => {
        res.status(500).send(err);
      })
    })
    .catch((err) => res.status(500).send(err));
}


const getYahtzeeGame = async (req, res) => {
  const { gameKey } = req.params;
  YahtzeeSession.findOne({ _id: gameKey })
    .then((gameState) => {
      if (gameState === null) {
        throw new Error
      }
      res.status(200).send(gameState);
    })
    .catch((err) => {
      res.status(404).send(err);
    })
}

const updateYahtzeeGame = async (req, res) => {
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