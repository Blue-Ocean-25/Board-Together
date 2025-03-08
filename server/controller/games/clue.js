const mongoose = require('mongoose');
const express = require('express');

const { ClueSession, CluePlayer } = require('../../db/models/games/clue');
const User = require('../../db/models/profile/profile.js');
const makeClue = async (req, res) => {
  // req.body should contain the room_name, players
  const { room_name, players, email } = req.body;
    let newPlayers = Array.from({ length: players }, (_, index) => ({
      player_id: String(index + 1),
    }));

    let newSession = new ClueSession({
      room_name: room_name,
      players: newPlayers,
    })

    newSession.save()
      .then((game) => {
        User.updateOne({email}, {$push: {gamesInProgress: `Clue: ${JSON.parse(JSON.stringify(game._id))}`}})
          .then((result) => {
            res.status(201).send(game);
          })
          .catch((err) => {
            res.status(500).send(err);
          })
      })
      .catch((err) => {
        res.status(500).send(err)
      });
}

const getClueGame = async (req, res) => {
  const { gameKey } = req.params;
  ClueSession.findOne({ _id: gameKey })
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

const updateClueGame = async (req, res) => {
  const { gameKey } = req.params;
  const { playerId, category, name } = req.body;
  const curGame = await ClueSession.findOne({ _id: gameKey, 'players.player_id': playerId }, { 'players.$': 1 });

  const player = curGame.players[0];
  const curVal = player[category][name];

  await ClueSession.updateOne(
    { _id: gameKey, 'players.player_id': playerId},
    { $set: {[`players.$.${category}.${name}`]: !curVal} }
  );
  const gameState = await ClueSession.findOne({ _id: gameKey });

  res.status(200).send(gameState);
};

const updateClueName = async (req, res) => {
  const { gameKey, playerId } = req.params;
  const {playerName } = req.body;

  await ClueSession.updateOne(
    { _id: gameKey, 'players.player_id': playerId},
    { $set: {'players.$.player_id': playerName} }
  );
  const gameState = await ClueSession.findOne({ _id: gameKey });

  res.status(200).send(gameState);
};

module.exports = { makeClue, getClueGame, updateClueGame, updateClueName };