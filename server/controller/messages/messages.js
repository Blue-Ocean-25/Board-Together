const User = require('../../db/models/profile/profile.js');
const Message = require('../../db/models/messages/messages.js');

const createMessage = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      const message = user.username + ': ' + req.body.message;
      Message.create({
        gameId: req.body.gameId,
        message
      })
        .then(() => {
          res.sendStatus(201);
        })
        .catch(() => {
          res.sendStatus(500);
        })
    })
    .catch((err) => {
      res.sendStatus(500);
    })
}

const findMessages = (req, res) => {
  const gameId = req.params.gameKey;
  Message.find({ gameId })
    .sort({ createdAt: -1 })
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

module.exports = { findMessages, createMessage }