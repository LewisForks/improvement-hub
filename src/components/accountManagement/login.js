import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleRedirect = () => {
    // Redirect to the home page for now after successful login
    if (auth.currentUser) {
      navigate("/dashboard");
    } else {
      console.error("User not logged in");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleRedirect();
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        handleRedirect();
      } else {
        localStorage.setItem('registrationStep', '2');
        navigate("/register");
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <form id="signInForm">
      <h1>Sign In</h1>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin} id="submitBtn">
        Sign In
      </button>
      <button onClick={handleGoogleLogin} id="submitBtn">
        Sign In With Google
      </button>
    </form>
  );
};