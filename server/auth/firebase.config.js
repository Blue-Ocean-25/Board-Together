const { initializeApp } = require('firebase/app');
const { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInAnonymously, signOut, updateProfile } = require('firebase/auth');
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
// const googleProvider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
}

const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

// const signInWithGoogle = () => {
//   signInWithPopup(auth, googleProvider)
//     .then((result) => {
//       const user = result.user;
//       // Signed in
//       console.log('User signed in with Google:', user);
//     }).catch((error) => {
//       console.error('Google login failed:', error.message);
//     });
// }

// const signInAsGuest = async () => {
//   try {
//     await signInAnonymously(auth);
//     // Signed in
//     console.log('User signed in as guest:');
//   } catch (error) {
//     console.error('Guest login failed:', error.message);
//   }
// };


const logOut = () => {
  signOut(auth)
    .then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Logout failed:', error.message);
    });
}


module.exports = { auth, createUser, signInUser, logOut };


