const mongoose = require('mongoose');
const { Schema } = mongoose;

const yahtzeePlayerSchema = new Schema({
  player_id: Number,
  player_name: {type: String, default: 'Player', required: true},
  aces: {type: Number, default: 0, required: true},
  twos: {type: Number, default: 0, required: true},
  threes: {type: Number, default: 0, required: true},
  fours: {type: Number, default: 0, required: true},
  fives: {type: Number, default: 0, required: true},
  sixes: {type: Number, default: 0, required: true},
  three_of_a_kind: {type: Number, default: 0, required: true},
  four_of_a_kind: {type: Number, default: 0, required: true},
  full_house: {type: Number, default: 0, required: true},
  small_straight: {type: Number, default: 0, required: true},
  large_straight: {type: Number, default: 0, required: true},
  yahtzee: {type: Number, default: 0, required: true},
  chance: {type: Number, default: 0, required: true},
  yahtzee_bonus: {type: Number, default: 0, required: true}
});

const yahtzeeSchema = new Schema({
  room_name: String,
  players:[yahtzeePlayerSchema],
});

const YahtzeePlayer = mongoose.model('YahtzeePlayer', yahtzeePlayerSchema);
const YahtzeeSession = mongoose.model('Yahtzee', yahtzeeSchema);

module.exports = {YahtzeeSession, YahtzeePlayer};

/*
                    ____
                  .'* *.'
               __/_*_*(_
              / _______ \
             _\_)/___\(_/_
            / _((\- -/))_ \
            \ \())(-)(()/ /
             ' \(((()))/ '
            / ' \)).))/ ' \
           / _ \ - | - /_  \
          (   ( .;''';. .'  )
          _\"__ /    )\ __"/_
            \/  \   ' /  \/
             .'  '...' ' )
              / /  |  \ \
             / .   .   . \
            /   .     .   \
           /   /   |   \   \
         .'   /    b    '.  '.
     _.-'    /     Bb     '-. '-._
 _.-'       |      BBb       '-.  '-.
(________mrf\____.dBBBb.________)____)

*/