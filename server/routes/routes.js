const express = require('express');

const router = express.Router();
const { login, signup, verifyLogin } = require('../controller/auth.js');
const { makeYahtzee, makeClue, makeScrabble, getScrabbleGame, getYahtzeeGame, getClueGame, updateClueGame, updateClueName } = require('../controller/index');
const { createProfile, getProfile, addFriend } = require('../controller/profile/profile');

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

// Auth routes
router.post('/login', login);
router.post('/signup', signup);
router.get('/verifyLogin', verifyLogin);

// Game routes
router.post('/yahtzee', makeYahtzee);
router.post('/clue', makeClue);
router.put('/clue/:gameKey/:playerId', updateClueName)
router.put('/clue/:gameKey', updateClueGame);
router.post('/scrabble', makeScrabble);
router.get('/yahtzee/:gameKey', getYahtzeeGame);
router.get('/scrabble/:gameKey', getScrabbleGame);
router.get('/clue/:gameKey', getClueGame) // :(
// Profile routes
router.post('/profile', createProfile);
router.get('/profile/:id', getProfile);
router.post('/profile/:id/addFriend', addFriend);

module.exports = router;