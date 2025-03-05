require('dotenv').config();
const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin');
const { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut, updateProfile, setPersistence, inMemoryPersistence } = require('firebase/auth');
const { getAnalytics } = require('firebase/analytics');
const serviceAccount = require('./selectionKey/' + process.env.SERVICE_ACCOUNT_URL);

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

const firebaseAdminConfig = {...firebaseConfig, credential: admin.credential.cert(serviceAccount)}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const adminApp = admin.initializeApp(firebaseAdminConfig);
const adminAuth = adminApp.auth();
const auth = getAuth(app);

setPersistence(auth, inMemoryPersistence);

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

const createCookie = (idToken, expiresIn) => {
  return adminAuth.createSessionCookie(idToken, { expiresIn })
}

const verifySessionCookie = (cookie) => {
  return adminAuth.verifySessionCookie(cookie, true)
}

module.exports = { createUser, signInUser, createCookie, verifySessionCookie };


