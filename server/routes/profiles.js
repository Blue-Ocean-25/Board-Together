const express = require('express');
const User = require('../db/models/profile/profile.js');

const getProfile = async (req, res) => {
  await User.find({ username: req.body.username });
    .then((profile) => {
    res.status(200).send(profile);
  })
  .catch((err) => {
    res.status(404).send(err);
  })
};

const addFriend = async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.body.friendId;
  try {
    await User.findByIdAndUpdate(userId, { $push: { friends: friendId } });
    res.status(200).send('Friend added');
  } catch (err) {
    res.status(404).send(err);
    console.error(err);
  }
};

module.exports = { getProfile, addFriend };
