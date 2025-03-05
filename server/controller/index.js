const { makeYahtzee, getYahtzeeGame } = require('./games/yahtzee');
const { makeClue, getClueGame, updateClueGame, updateClueName } = require('./games/clue');
const { makeScrabble, getScrabbleGame } = require('./games/scrabble');

module.exports = { makeYahtzee, makeClue, makeScrabble, getScrabbleGame, getYahtzeeGame, getClueGame, updateClueGame, updateClueName };