const mongoose, { Schema }  = require('mongoose');

const scrabblePlayerSchema = new Schema({
  player_id: Number,
  name: String,
  score: Number
});

const scrabbleSchema = new Schema({
  room_name: String,
  players: [scrabblePlayerSchema]
}):

const ScrabblePlayer = mongoose.model('ScrabblePlayer', scrabblePlayerSchema);
const ScrabbleSession = mongoose.model('Scrabble', scrabbleSchema);

module.exports = { ScrabblePlayer, ScrabbleSession };