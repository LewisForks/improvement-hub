import "./accountStatistics.css";
import { useEffect, useState } from "react";
import { db } from "../../../../config/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth } from "../../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AccountStatistics = () => {
  const [goalsComplete, setGoalsComplete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        const q = query(
          collection(db, "goals"),
          where("userId", "==", user.uid),
          where("completed", "==", true)
        );
        const unsubscribeSnapshot = onSnapshot(
          q,
          (snapshot) => {
            setGoalsComplete(snapshot.size);
            setLoading(false);
          },
          (error) => {
            console.error("Error fetching goals: ", error);
            setLoading(false);
          }
        );

        // Clean up the onSnapshot listener
        return () => unsubscribeSnapshot();
      }
    });

    // Clean up the onAuthStateChanged listener
    return () => unsubscribe();
  }, [auth, db]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="separator">
        <h4>Account Statistics</h4>
      </div>

      <div className="stats">
        <div className="item">
          <div className="top">
            <p>Current Account Plan</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>Basic</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Workouts Complete</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>0</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Books Read</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>0</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Habits Left Today</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>0</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Goals Complete</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>{goalsComplete}</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>IDK WHAT ELSE</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>0</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
