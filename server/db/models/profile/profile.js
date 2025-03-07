const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  profilePic: {
    data: { type: Buffer, default: null },
    contentType: { type: String, default: null }
  },
  gamesInProgress: { type: [String], default: []},
  gamesPlayed: { type: Number, default: 0 },
  gameHistory: { type: Array, default: [] },
  friends: { type: Array, default: [] },
  cookie: { type: String },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;