// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app")
const { getFirestore } = require('firebase/firestore')
const { getStorage } = require('firebase/storage')
const { getAuth, GoogleAuthProvider } = require('firebase/auth')
require('dotenv').config();
const { REACT_APP_API_KEY, REACT_APP_AUTH_DOMAIN, REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID, REACT_APP_APP_ID } = process.env


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

module.exports = {
  db,
  storage,
  auth,
  provider
}