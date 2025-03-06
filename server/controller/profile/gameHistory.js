const express = require('express');
const mongoose = require('mongoose');
const {gameHistory} = require('../../db/models/profile/gameHistory.js')

const saveGameHistory = (req, res) => {
  gameHistory.create(req.body)
  res.status(201).end();
}

const getGameHistory = async (req, res) => {
  const games = await gameHistory.find({email: req.params.email})
  res.status(200).send(games)
}

module.exports = { saveGameHistory, getGameHistory };
