// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2oeAng0twdBjtEc_4HpEYglh7Dx0frgw",
  authDomain: "teamder-f776c.firebaseapp.com",
  projectId: "teamder-f776c",
  storageBucket: "teamder-f776c.appspot.com",
  messagingSenderId: "693221137509",
  appId: "1:693221137509:web:6e7cf64d567a1f9ed93a8c",
  measurementId: "G-73BE1WHE49",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
