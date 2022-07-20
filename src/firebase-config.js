import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDls9q4qsH2R3r3jpt_7mpj7is6HIflbNY",
  authDomain: "my-todo-app-58534.firebaseapp.com",
  projectId: "my-todo-app-58534",
  storageBucket: "my-todo-app-58534.appspot.com",
  messagingSenderId: "340782798830",
  appId: "1:340782798830:web:58b3e2ffcdf6aef97260ff",
  measurementId: "G-TTP5W78D2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
