// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByMD2TspXhNmUfke1D9_lQr0jrWxqacUU",
  authDomain: "d-notes-app.firebaseapp.com",
  databaseURL: "https://d-notes-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "d-notes-app",
  storageBucket: "d-notes-app.appspot.com",
  messagingSenderId: "594292840183",
  appId: "1:594292840183:web:e045e5845bb7f96373e5f2",
  measurementId: "G-VWL6TCT3NF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore DB
export const db = getFirestore(app)