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

module.exports = { createProfile, getProfile, addFriend, addProfilePic };
