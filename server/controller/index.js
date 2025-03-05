const { makeYahtzee, getYahtzeeGame, updateYahtzeeGame } = require('./games/yahtzee');
const { makeClue, getClueGame, updateClueGame, updateClueName } = require('./games/clue');
const { makeScrabble, getScrabbleGame } = require('./games/scrabble');

module.exports = { makeYahtzee, makeClue, makeScrabble, getYahtzeeGame, getClueGame, updateClueGame, updateClueName, getScrabbleGame, updateYahtzeeGame };