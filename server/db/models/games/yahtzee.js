const mongoose, { Schema }  = require('mongoose');

const yahtzeePlayerSchema = new Schema({
  player_id: Number,
  player_name: {String, default: 'Player'},
  aces: {Number, default: 0},
  twos: {Number, default: 0},
  threes: {Number, default: 0},
  fours: {Number, default: 0},
  fives: {Number, default: 0},
  sixes: {Number, default: 0},
  three_of_a_kind: {Number, default: 0},
  four_of_a_kind: {Number, default: 0},
  full_house: {Number, default: 0},
  small_straight: {Number, default: 0},
  large_straight: {Number, default: 0},
  yahtzee: {Number, default: 0},
  chance: {Number, default: 0},
  yahtzee_bonus: {Number, default: 0}
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