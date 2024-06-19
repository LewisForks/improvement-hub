import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  onSnapshot,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";


import { db, auth } from "../../../config/firebase";

export const ToDo = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const localDate = useMemo(
    () =>
      new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      ),
    [selectedDate]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true);

        const q1 = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "==", null)
        );

        const q2 = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "==", localDate.toISOString().slice(0, 10))
        );

        const [snapshot1, snapshot2] = await Promise.all([
          getDocs(q1),
          getDocs(q2),
        ]);

        const tasksData = [
          ...snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          ...snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ];

        setTasks(tasksData);
        setLoading(false);
      }
    });

    // Clean up the onAuthStateChanged listener
    return () => unsubscribe();
  }, [auth, db, selectedDate]);

  console.log(tasks);

  return (
    <div className="todo-container">
      <div className="separator">
        <h4>
          Tasks -{" "}
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : "No date selected"}
        </h4>
      </div>
      <div>

      </div>
    </div>
  );
};
