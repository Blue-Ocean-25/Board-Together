const express = require('express');

const router = express.Router();
const { login, signup, verifyLogin, logOut } = require('../controller/auth.js');
const { makeYahtzee, makeClue, makeScrabble, getScrabbleGame, getYahtzeeGame, getClueGame, updateYahtzeeGame } = require('../controller/index');
const { createProfile, getProfile, addFriend } = require('../controller/profile/profile');

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

// Auth routes
router.post('/login', login);
router.post('/signup', signup);
router.get('/verifyLogin', verifyLogin);
router.put('/logOut', logOut);
// Game routes
router.post('/yahtzee', makeYahtzee);
router.post('/clue', makeClue);
router.post('/scrabble', makeScrabble);
router.get('/yahtzee/:gameKey', getYahtzeeGame);
router.get('/scrabble/:gameKey', getScrabbleGame);
router.get('/clue/:gameKey', getClueGame) // :(
router.put('/yahtzee/:gameKey', updateYahtzeeGame);
// Profile routes
router.post('/profile', createProfile);
router.get('/profile/:email', getProfile);
router.post('/profile/:id/addFriend', addFriend);

module.exports = router;