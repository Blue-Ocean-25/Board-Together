const express = require('express');

const router = express.Router();
const { makeYahtzee, makeClue, makeScrabble } = require('../controller/index');
// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

// Add more routes here
router.post('/yahtzee', makeYahtzee);
router.post('/clue', makeClue);
router.post('/scrabble', makeScrabble);

module.exports = router;