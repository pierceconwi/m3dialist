// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "m3dialist.firebaseapp.com",
  projectId: "m3dialist",
  storageBucket: "m3dialist.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase into "app" as an object value so it may be accessed
const app = initializeApp(firebaseConfig);

// Connect to Authentication
const auth = getAuth(app);

// Connect to Firestore database
const db = getFirestore(app);

export { auth, db };