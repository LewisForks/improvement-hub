import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAeF8f5vMjTBx53btBAzinbNEIgjgnfVQg",
  authDomain: "improvementhub-16b0d.firebaseapp.com",
  projectId: "improvementhub-16b0d",
  storageBucket: "improvementhub-16b0d.appspot.com",
  messagingSenderId: "462575771878",
  appId: "1:462575771878:web:5236afc51ccbf33332db27",
  measurementId: "G-QL8DZSW5CC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);