const { makeYahtzee, getYahtzeeGame, updateYahtzeeGame } = require('./games/yahtzee');
const { makeClue, getClueGame, updateClueGame, updateClueName } = require('./games/clue');
const { makeScrabble, getScrabbleGame,updateScrabbleGame } = require('./games/scrabble');
const { saveGameHistory, getGameHistory } = require('./profile/gameHistory.js');

module.exports = { makeYahtzee, makeClue, makeScrabble, getYahtzeeGame, getClueGame, updateClueGame, updateClueName, getScrabbleGame, updateYahtzeeGame, updateScrabbleGame, saveGameHistory, getGameHistory };