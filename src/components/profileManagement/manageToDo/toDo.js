import "./toDo.css";
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  onSnapshot,
  query,
  where,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../../config/firebase";

export const ToDo = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const tasksPerPage = 14;

  // use local date to avoid timezone issues (i hate javascript)
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
        // tasks with no date set (continuous)
        const q1 = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "==", null)
        );
        // tasks with selected date
        const q2 = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "==", localDate.toISOString().slice(0, 10))
        );

        const [snapshot1, snapshot2] = await Promise.all([
          getDocs(q1),
          getDocs(q2),
        ]);
        // put all tasks into one array
        const tasksData = [
          ...snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          ...snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ];

        setTasks(tasksData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, db, selectedDate]);

  const handleCheckboxChange = async (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;
    // update local state
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].isCompleted = !updatedTasks[taskIndex].isCompleted;

    setTasks(updatedTasks);
    // update firestore with isCompleted value
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      await updateDoc(taskRef, {
        isCompleted: updatedTasks[taskIndex].isCompleted,
      });
    }
  };
  // sort tasks by isCompleted
  const sortedTasks = tasks.sort((a, b) =>
    a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1
  );

  const paginateTasks = () => {
    const start = page * tasksPerPage;
    const end = start + tasksPerPage;
    return sortedTasks.slice(start, end);
  };

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

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
        <div className="tasks">
          {loading ? (
            <p>Loading...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            paginateTasks().map((task) => (
              <div className="item" key={task.id}>
                <div className="left">
                  <div className="completed">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => handleCheckboxChange(task.id)}
                    ></input>
                  </div>
                  <div className="details">
                    <h5>{task.name}</h5>
                    <p>{task.description || "No Description"}</p>
                    <p>Complete By: {task.taskDate}</p>
                  </div>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </div>
            ))
          )}
        </div>
        {tasks.length > tasksPerPage && (
          <div className="pagination">
            <button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
              disabled={page === 0}
            >
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() =>
                setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
              }
              disabled={page === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
