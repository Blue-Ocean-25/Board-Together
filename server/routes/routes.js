const express = require('express');
const multer = require('multer');

const router = express.Router();
const { login, signup, verifyLogin, logOut } = require('../controller/auth.js');
const { makeYahtzee, makeClue, makeScrabble, getScrabbleGame, getYahtzeeGame, getClueGame, updateYahtzeeGame, updateScrabbleGame, updateClueGame, updateClueName, saveGameHistory, getGameHistory } = require('../controller/index');
const { createProfile, getProfile, addFriend, addProfilePic } = require('../controller/profile/profile');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
router.put('/clue/:gameKey/:playerId', updateClueName)
router.put('/clue/:gameKey', updateClueGame);
router.post('/scrabble', makeScrabble);
router.get('/yahtzee/:gameKey', getYahtzeeGame);
router.get('/scrabble/:gameKey', getScrabbleGame);
router.get('/clue/:gameKey', getClueGame) // :(
router.put('/yahtzee/:gameKey', updateYahtzeeGame);
router.put('/scrabble/:gameKey', updateScrabbleGame);
// Profile routes
router.post('/profile', createProfile);
router.get('/profile/:email', getProfile);
router.post('/profile/:id/addFriend', addFriend);
router.put('/profile/:id/profilePicture', upload.single('imageBlob'), addProfilePic);
module.exports = router;