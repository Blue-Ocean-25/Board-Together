const express = require('express');

const router = express.Router();
const auth = require('../controller/auth.js');
// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

//Auth routes
router.post('/login', auth.login);
router.post('/signup', auth.signup);

module.exports = router;