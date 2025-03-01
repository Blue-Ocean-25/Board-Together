const express = require('express');

const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Welcome to Board Together API');
});

// Add more routes here

module.exports = router;