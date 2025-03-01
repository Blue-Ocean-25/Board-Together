const mongoose, { Schema }  = require('mongoose');

const cluePlayerCardSchema = new Schema({
  player_id: {type: Number, required: true},
  suspects: {type: Object, required: true},
  weapons: {type: Object, required: true},
  rooms: {type: Object, required: true},
})

const clueSchema = new Schema({
  room_name: { type: String, required: true},
  players: [cluePlayerCardSchema],
});

const ClueSession = mongoose.model("ClueSession", clueSchema);
const CluePlayer = mongoose.model("CluePlayer", clueSchema);

module.exports = { ClueSession, CluePlayer };