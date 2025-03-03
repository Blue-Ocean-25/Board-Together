const express = require('express');
require('dotenv').config();
const app = express();
const db = require('./db/db.js');
const path = require('path');


const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/api', require('./routes/routes.js'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'));
});


module.exports = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});