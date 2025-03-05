const { makeYahtzee, getYahtzeeGame, updateYahtzeeGame } = require('./games/yahtzee');
const { makeClue, getClueGame } = require('./games/clue');
const { makeScrabble, getScrabbleGame,updateScrabbleGame } = require('./games/scrabble');

module.exports = { makeYahtzee, makeClue, makeScrabble, getYahtzeeGame, getClueGame, getScrabbleGame, updateYahtzeeGame, updateScrabbleGame };