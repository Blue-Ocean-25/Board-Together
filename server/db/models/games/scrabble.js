const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrabblePlayerSchema = new Schema({
  player_id: Number,
  name: {type: String, default: 'Player', required: true},
  score: {type: Number, default: 0, required: true},
});

const scrabbleSchema = new Schema({
  room_name: String,
  players: [scrabblePlayerSchema]
});

const ScrabblePlayer = mongoose.model('ScrabblePlayer', scrabblePlayerSchema);
const ScrabbleSession = mongoose.model('Scrabble', scrabbleSchema);

module.exports = { ScrabblePlayer, ScrabbleSession };