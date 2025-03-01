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

module.exports = { makeYahtzee };