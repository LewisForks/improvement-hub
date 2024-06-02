import "./profile.css";
import { useState, useEffect } from "react";
import { db, auth } from "../../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const Profile = () => {
  const [username, setUsername] = useState("John Doe");
  const [profilePic, setProfilePic] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png");
  const [plan, setPlan] = useState("Basic Plan");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDoc);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUsername(userData.username);
            setProfilePic(userData.profilePic);
            setPlan(userData.plan);
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
    <div className="top">
      <i className="bx bx-bell"></i>
      <div className="profile">
        <div className="left">
          <img src={profilePic} />
          <div className="user">
            <h5>{username}</h5>
            <a href="/pricing">{plan} Plan</a>
          </div>
        </div>
        <i className="bx bxs-chevron-right"></i>
      </div>
    </div>
  );
};
