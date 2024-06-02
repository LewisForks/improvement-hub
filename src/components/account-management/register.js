import { useState, useEffect } from "react";
import { auth, googleProvider } from "../../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [step, setStep] = useState(
    Number(localStorage.getItem("registrationStep")) || 1
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(null);
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("registrationStep");

    return () => {
      localStorage.removeItem("registrationStep");
    };
  }, []);

  const handleRedirect = () => {
    // Redirect to the home page for now after successful registration
    if (auth.currentUser) {
      navigate("/account/manage");
    } else {
      console.error("User not logged in");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);
      alert("Verification email sent. Please verify your email to continue.");
      setStep(2);
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else {
        setError(
          "An error occurred. If this persists, please contact support."
        );
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        handleRedirect();
      } else {
        setStep(2);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. If this persists, please contact support.");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setProfilePicURL(URL.createObjectURL(file));
  };

  const handleAdditionalInfo = async (e) => {
    e.preventDefault();
    try {
      // Upload profile picture to Firebase Storage
      const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // show upload progress, maybe add in future
        },
        (error) => {
          console.error(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await setDoc(userDocRef, {
              username,
              dob,
              profilePic: downloadURL,
              plan: "Basic",
            });

            const goalDocRef = doc(collection(db, "goals"));
            await setDoc(goalDocRef, {
              title: goalTitle,
              description: goal,
              userId: auth.currentUser.uid,
            });

            window.location.href = "/";
          });
        }
      );
    } catch (error) {
      console.error(error);
      setError("An error occurred. If this persists, please contact support.");
    }
  };

  return (
    <div>
      {step === 1 && (
        <form id="signUpForm">
          <h1>Register</h1>
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
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleRegister} id="submitBtn">
            Sign Up
          </button>
          <button onClick={handleGoogleRegister} id="submitBtn">
            Sign Up With Google
          </button>
        </form>
      )}
      {step === 2 && (
        <form id="profileForm">
          <h1>Profile Setup</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="profilePic">Profile Picture:</label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleProfilePicChange}
            required
          />
          {profilePicURL && (
            <img style={{ width: "150px" }} src={profilePicURL} alt="Profile" />
          )}
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <label htmlFor="goals">First Goal:</label>
          <input
            type="text"
            id="goalsTitle"
            name="goalsTitle"
            placeholder="Enter a goal"
            onChange={(e) => setGoalTitle(e.target.value)}
            required
          ></input>
          <textarea
            id="goals"
            name="goals"
            placeholder="Explain your goal here..."
            onChange={(e) => setGoal(e.target.value)}
            required
          />
          <button onClick={handleAdditionalInfo} id="submitBtn">
            Continue
          </button>
        </form>
      )}
    </div>
  );
};
