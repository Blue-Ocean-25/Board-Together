const express = require('express');
const multer = require('multer');
const User = require('../../db/models/profile/profile.js');


const createProfile = (username, email, phoneNumber) => {
  return User.create({
    username,
    email,
    phoneNumber,
  });
};

const getProfile = (req, res) => {
  User.find({ email: req.params.email })
    .then((profile) => {
      res.status(200).send(profile)
    })
    .catch((err) => {
      res.status(404).send(err);
    })
};

const getFriendsByUsername = (req, res) => {
  User.find({ username: { $regex: `^${req.params.username}`, $options: 'i' } })
    .then((profile) => {
      res.status(200).send(profile)
    })
    .catch((err) => {
      res.status(404).send(err);
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


const deleteFriend = async (req, res) => {
  const userEmail = req.body.email;
  const friendUsername = req.body.friendName;

  try {
    const
      user = await User.findOneAndUpdate
        ({ email: userEmail },
          { $pull: { friends: friendUsername } },
          { new: true });
    res.status(200).send('Friend deleted');
  }
  catch (err) {
    console.error(err);
    res.status(404).send(err);
  }
};

const addProfilePic = async (req, res) => {
  const userId = req.params.id;
  const { buffer, mimetype } = req.file;
  try {
    const user = await User.findOne({ _id: userId })
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    user.profilePic = { data: buffer, contentType: mimetype };
    await user.save();
    res.status(200).send(user);
    return;
  } catch (err) {
    res.status(500).send('Server Error: ', err);
    return;
  }
}

module.exports = { createProfile, getProfile, addFriend, addProfilePic, getFriendsByUsername, deleteFriend };
