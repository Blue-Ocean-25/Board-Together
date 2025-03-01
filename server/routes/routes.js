const express = require('express');

const router = express.Router();
const { login, signup } = require('../controller/auth.js');
const { makeYahtzee, makeClue, makeScrabble } = require('../controller/index');

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

// Auth routes
router.post('/login', login);
router.post('/signup', signup);

// Game routes
router.post('/yahtzee', makeYahtzee);
router.post('/clue', makeClue);
router.post('/scrabble', makeScrabble);

module.exports = router;