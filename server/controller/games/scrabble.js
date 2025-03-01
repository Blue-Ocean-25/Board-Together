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

module.exports = { makeScrabble };