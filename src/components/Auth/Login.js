import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form id="signInForm">
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
