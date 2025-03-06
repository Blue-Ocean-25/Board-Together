const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  winner: {type: String, required: true},
  players: [{type: String, required: true}],
  game: {type: String, required: true},
  gameKey: {type: String, required: true},
  email: {type: String, required: true}
}, { timestamps: true })

const gameHistory = mongoose.model('gameHistory', gameHistorySchema);

module.exports.gameHistory = gameHistory;