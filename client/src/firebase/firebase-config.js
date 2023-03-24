// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEIEi4PeYJC2sgQKigvJZ8k1odVXd9RGE",
  authDomain: "pf-henry-2d98b.firebaseapp.com",
  databaseURL: "https://pf-henry-2d98b-default-rtdb.firebaseio.com",
  projectId: "pf-henry-2d98b",
  storageBucket: "pf-henry-2d98b.appspot.com",
  messagingSenderId: "355791094095",
  appId: "1:355791094095:web:e87c82f1f202bc17c7c53a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)