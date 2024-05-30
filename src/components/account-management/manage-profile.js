import { useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const ManageProfile = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <form>
      <h1>Manage Profile</h1>
      <label htmlFor="profilePicture">Profile Picture:</label>
      <input type="file" id="profilePicture" name="profilePicture" />
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter Username"
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter Email"
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter Password"
        required
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm Password"
        required
      />
      <button id="submitBtn">Update Profile</button>
    </form>
  );
};
