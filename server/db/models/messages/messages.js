const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  gameId: { type: String, required: true },
  message: { type: String, required: true  },
  createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;