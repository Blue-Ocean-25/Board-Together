const express = require('express');

const router = express.Router();
const { login, signup, verifyLogin } = require('../controller/auth.js');
const { makeYahtzee, makeClue, makeScrabble } = require('../controller/index');
const { createProfile, getProfile, addFriend } = require('../controller/profile/profile');

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

// Auth routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/verifyLogin', verifyLogin);

// Game routes
router.post('/yahtzee', makeYahtzee);
router.post('/clue', makeClue);
router.post('/scrabble', makeScrabble);

// Profile routes
router.post('/profile', createProfile);
router.get('/profile/:id', getProfile);
router.post('/profile/:id/addFriend', addFriend);

module.exports = router;