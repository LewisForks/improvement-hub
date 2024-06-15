import "./header.css";
import { useState, useEffect } from "react";
import { db, auth } from "../../../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const DashboardHeader = () => {
  const [username, setUsername] = useState("John Doe");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.username);;
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <header>
      <button className="menu-btn" id="menu-open">
        <i className="bx bx-menu"></i>
      </button>
      <h5>
        Hello <b>{username}</b>, welcome back!
      </h5>
    </header>
  );
};
