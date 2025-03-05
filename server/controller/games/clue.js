const mongoose = require('mongoose');
const express = require('express');

const { ClueSession, CluePlayer } = require('../../db/models/games/clue');

const makeClue = async (req, res) => {
  // req.body should contain the room_name, players
  const { room_name, players } = req.body;
    let newPlayers = Array.from({ length: players }, (_, index) => ({
      player_id: String(index + 1),
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
  console.log(gameKey, playerId, playerName);
  // const curGame = await ClueSession.findOne({ _id: gameKey, 'players.player_id': playerId }, { 'players.$': 1 });

  // const player = curGame.players[0];

  await ClueSession.updateOne(
    { _id: gameKey, 'players.player_id': playerId},
    { $set: {'players.$.player_id': playerName} }
  );
  const gameState = await ClueSession.findOne({ _id: gameKey });

  res.status(200).send(gameState);
};

module.exports = { makeClue, getClueGame, updateClueGame, updateClueName };