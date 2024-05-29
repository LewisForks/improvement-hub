// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeF8f5vMjTBx53btBAzinbNEIgjgnfVQg",
  authDomain: "improvementhub-16b0d.firebaseapp.com",
  projectId: "improvementhub-16b0d",
  storageBucket: "improvementhub-16b0d.appspot.com",
  messagingSenderId: "462575771878",
  appId: "1:462575771878:web:5236afc51ccbf33332db27",
  measurementId: "G-QL8DZSW5CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);