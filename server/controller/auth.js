const {createUser, signInUser} = require('../auth/firebase.config.js');

const login = (req, res) => {
  const { email, password } = req.body;

  signInUser(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User created:', user);
      res.status(200).send();
    })
    .catch((error) => {
      console.error('Error creating user', error.message);
    });
};

const signup = (req, res) => {
  const { username, phoneNumber, email, password } = req.body;

  createUser(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('User created:', user);
      res.status(200).send();
    })
    .catch((error) => {
      console.error('Error creating user', error.message);
    });
};

module.exports = {login, signup};