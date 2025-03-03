const { initializeApp } = require('firebase/app');
const { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut, updateProfile, setPersistence, inMemoryPersistence } = require('firebase/auth');
const { getAnalytics } = require('firebase/analytics');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, inMemoryPersistence);

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}


const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Logout failed:', error.message);
    });
}

const createCookie = (idToken) => {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  return auth.createSessionCookie(idToken, { expiresIn })
}
module.exports = { auth, createUser, signInUser, logOut };


