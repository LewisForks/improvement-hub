import "./account-details.css";
import React, { useState, useEffect } from "react";
import "./account-details.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../../../../config/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

export const AccountDetails = () => {
  const [censoredEmail, setCensoredEmail] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [providerId, setProviderId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setProviderId(user.providerData[0].providerId);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const censoredEmail = user.email.replace(
            /(?<=.{3}).(?=[^@]*?@)/g,
            "*"
          );
          setCensoredEmail(censoredEmail);
          setEmail(user.email);

          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.username);
          }
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEditClick = () => {
    setIsEditing(false);
    resetForm();
  };

  // call to reset form details
  const resetForm = () => {
    setIsEditing(false);
    setEmail(auth.currentUser.email);
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;

      if (providerId === "password") {
        // User signed up with email and password
        const credential = EmailAuthProvider.credential(
          user.email,
          confirmPassword
        );

        try {
          await reauthenticateWithCredential(user, credential);
        } catch (error) {
          setError("Incorrect password. Please try again.");
          return;
        }

        // Check if the email has changed
        if (email !== user.email) {
          verifyBeforeUpdateEmail(user, email);
          try {
            await updateEmail(user, email);
          } catch (error) {
            if (error.code === "auth/operation-not-allowed") {
              setError(
                `Verification email sent to ${email}. You will be logged out on all devices.`
              );
            } else {
              setError("An error occurred while updating the email.");
            }
            console.error(error);
            return;
          }
        }

        // Check if the password has changed
        if (password) {
          await updatePassword(user, password);
          alert("Password updated!");
        }

        // Check if the username has changed
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);

        if (username !== userSnap.data().username) {
          await updateDoc(userDoc, { username: username });
        }
      } else {
        setError(
          "You can only update your account details if you signed up with email and password."
        );
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the account details.");
    }
    resetForm();
  };

  return (
    <div>
      <div className="separator" id="first">
        <h4>Account Details</h4>
      </div>

      <div className="account-details-container">
        <div className="account-details">
          <div className="left-details">
            <h2>Username:</h2>
            <h2>Email:</h2>
            {providerId === "password" && <h2>Password:</h2>}
            {providerId === "password" && (
              <h2
                id="confirmPasswordText"
                style={{ display: isEditing ? "block" : "none" }}
              >
                Current Password:
              </h2>
            )}
          </div>
          <div
            className="right-details"
            style={{ display: isEditing ? "none" : "flex" }}
          >
            {isLoading ? <p>Loading...</p> : <p>{username}</p>}
            {isLoading ? <p>Loading...</p> : <p>{censoredEmail}</p>}
            {providerId === "password" && <p>•••••••••••••</p>}
          </div>
          <div
            className="right-details-form"
            style={{ display: isEditing ? "block" : "none" }}
          >
            <form id="accountDetailsForm">
              <div className="input-container">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={providerId === "google.com"}
                />
              </div>
              {providerId === "password" && (
                <div className="input-container">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              {providerId === "password" && (
                <div className="input-container">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Current Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
            </form>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="account-details-btns">
          <button
            id="editBtn"
            onClick={handleEditClick}
            style={{ display: isEditing ? "none" : "block" }}
          >
            Edit
          </button>
          <button
            id="submitBtn"
            onClick={handleSubmit}
            style={{ display: isEditing ? "block" : "none" }}
            key={isEditing ? "editing" : "not-editing"}
          >
            Submit
          </button>
          <button
            id="cancelBtn"
            onClick={handleCancelEditClick}
            style={{ display: isEditing ? "block" : "none" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
