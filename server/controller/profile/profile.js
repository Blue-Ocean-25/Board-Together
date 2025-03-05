const express = require('express');
const User = require('../../db/models/profile/profile.js');

const createProfile = (username, email, phoneNumber) => {
  return User.create({
    username,
    email,
    phoneNumber
  });
};

const getProfile = (req, res) => {
  // console.log('EMAIL', req.params.email)
  User.find({ email: req.params.email })
    .then((profile) => {
      res.status(200).send(profile)
    })
    .catch((err) => {
      res.status(404).send(err);
    })
};

const getFriendsByUsername = (req, res) => {
  console.log(req.params.username, '***')
  User.find({ username: req.params.username })
    .then((profile) => {
      res.status(200).send(profile)
    })
    .catch((err) => {
      res.status
    })
};


const addFriend = async (req, res) => {
  const userEmail = req.body.email;
  const friendUsername = req.body.addUsername;
  
  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { $addToSet: { friends: friendUsername } },
      { new: true });
    res.status(200).send('Friend added');
  } catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
};






module.exports = { createProfile, getProfile, addFriend, getFriendsByUsername };
