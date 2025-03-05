const mongoose = require('mongoose');
const { Schema } = mongoose;

const cluePlayerCardSchema = new Schema({
  player_id: {type: String, required: true},
  suspects: {
   colonel_mustard: {type: Boolean, required: true, default: true},
   professor_plum: {type: Boolean, required: true, default: true},
   reverend_green: {type: Boolean, required: true, default: true},
   mr_peacock: {type: Boolean, required: true, default: true},
   miss_scarlet: {type: Boolean, required: true, default: true},
   mrs_white: {type: Boolean, required: true, default: true},
  },
  weapons: {
    knife: {type: Boolean, required: true, default: true},
    candle_stick: {type: Boolean, required: true, default: true},
    revolver: {type: Boolean, required: true, default: true},
    rope: {type: Boolean, required: true, default: true},
    lead_pipe: {type: Boolean, required: true, default: true},
    wrench: {type: Boolean, required: true, default: true},
  },
  rooms: {
    hall: {type: Boolean, required: true, default: true},
    lounge: {type: Boolean, required: true, default: true},
    dinning_room: {type: Boolean, required: true, default: true},
    kitchen: {type: Boolean, required: true, default: true},
    ballroom: {type: Boolean, required: true, default: true},
    conservatory: {type: Boolean, required: true, default: true},
    billiard_room: {type: Boolean, required: true, default: true},
    library: {type: Boolean, required: true, default: true},
    study: {type: Boolean, required: true, default: true},
  },
})

const clueSchema = new Schema({
  room_name: {type: String},
  players: [cluePlayerCardSchema],
});

const ClueSession = mongoose.model("ClueSession", clueSchema);
const CluePlayer = mongoose.model("CluePlayer", clueSchema);

module.exports = { ClueSession, CluePlayer };