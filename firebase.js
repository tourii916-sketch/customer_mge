// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrjaixaztL3V0E0XPcIhNcW7lMXNbJuH4",
  authDomain: "dlw-my-project.firebaseapp.com",
  databaseURL: "https://dlw-my-project-default-rtdb.firebaseio.com",
  projectId: "dlw-my-project",
  storageBucket: "dlw-my-project.firebasestorage.app",
  messagingSenderId: "106098798204",
  appId: "1:106098798204:web:4ee97666408f58898423f9",
  measurementId: "G-8FVM5R3HXF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);