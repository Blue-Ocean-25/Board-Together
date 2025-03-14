const { createUser, signInUser, createCookie, verifySessionCookie } = require('../auth/firebase.config.js');
const { createProfile } = require('./profile/profile.js');

const login = (req, res) => {
  const { email, password } = req.body;

  signInUser(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      user.getIdToken().then((idToken) => {
        // Session login endpoint is queried and the session cookie is set.
        // CSRF protection should be taken into account.
        // ...
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        createCookie(idToken, expiresIn)
          .then((cookie) => {
            res.cookie('session', cookie, { maxAge: expiresIn, httpOnly: true, secure: false });
            res.status(200).send('Logged In');
          })
          .catch((error) => {
            console.error('Error creating session cookie:', error.message);
            res.status(401).send('UNAUTHORIZED REQUEST!');
          })
        // postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
      })
    })
    .catch((error) => {
      console.error('Error signing in:', error.message);
      res.status(500).send('Error creating user' + error.message);
    });
};

const signup = (req, res) => {
  const { username, phoneNumber, email, password } = req.body;
  createUser(email, password)
    .then((userCredential) => {
      // Signed in.
      const user = userCredential.user;
      createProfile(username, email, phoneNumber)
        .then(() => {
          res.status(200).send('User created');
        })
        .catch((error) => {
          res.status(500).send('Error creating user' + error.message);
        });
    })
    .catch((error) => {
      res.status(500).send('Error creating user' + error.message);
    });
};

const verifyLogin = (req, res) => {
  const cookie = req.cookies.session || '';
  verifySessionCookie(cookie)
    .then((results) => {
      res.send(results.email)
    })
    .catch((error) => {
      res.status(401).send('UNAUTHORIZED REQUEST!');
    })
}

const logOut = (req, res) => {
  res.clearCookie('session');
  res.status(204).send('Logged Out');
}

module.exports = { login, signup, verifyLogin, logOut };