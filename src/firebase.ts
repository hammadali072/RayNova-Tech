// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAFGX4bzgrOr0CSYHDnbpwSqkeWmLxbIa0",
  authDomain: "raynova-ad6f0.firebaseapp.com",
  databaseURL: "https://raynova-ad6f0-default-rtdb.firebaseio.com",
  projectId: "raynova-ad6f0",
  storageBucket: "raynova-ad6f0.firebasestorage.app",
  messagingSenderId: "326909973572",
  appId: "1:326909973572:web:07b2c6a4a3b060b2929811",
  measurementId: "G-NYV1WCK9R1"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const storage = getStorage(app);

export { app, analytics, db, storage };