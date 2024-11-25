// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0CtKpDxgFohf7FauM7k7un0Hbwnp1ik4",
  authDomain: "testeum-1a288.firebaseapp.com",
  projectId: "testeum-1a288",
  storageBucket: "testeum-1a288.appspot.com",
  messagingSenderId: "429676798005",
  appId: "1:429676798005:web:27f69006679886847bd17c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore};