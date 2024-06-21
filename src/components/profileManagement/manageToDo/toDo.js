import "./toDo.css";
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  onSnapshot,
  query,
  where,
  collection,
  doc,
  runTransaction,
} from "firebase/firestore";
import { db, auth } from "../../../config/firebase";

import { CreateTask } from "./createTask";

export const ToDo = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [contextMenuOpen, setContextMenuOpen] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);

        // query for tasks with no date
        const q1 = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "==", null)
        );

        // query for tasks with the selected date
        const q2 = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "==", localDate.toISOString().slice(0, 10))
        );

        // set up real-time listener
        const unsubscribe1 = onSnapshot(q1, (snapshot) => {
          const tasksData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksData);
          setLoading(false);
        });

        const unsubscribe2 = onSnapshot(q2, (snapshot) => {
          const tasksData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTasks(tasksData);
          setLoading(false);
        });

        // clean up function
        return () => {
          unsubscribe1();
          unsubscribe2();
        };
      }
    });

    // clean up function
    return () => {
      unsubscribe();
    };
  }, [selectedDate, localDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuOpen &&
        !event.target.closest(".context-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setContextMenuOpen(null);
      }
    };

    if (contextMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Clean up the event listener on unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, [contextMenuOpen]);

  const handleCheckboxChange = async (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return;

    // update local state
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].isCompleted = !updatedTasks[taskIndex].isCompleted;

    // If isCompleted is undefined, set it to false
    if (updatedTasks[taskIndex].isCompleted === undefined) {
      updatedTasks[taskIndex].isCompleted = false;
    }

    // update firestore with isCompleted value
    const taskRef = doc(db, "tasks", taskId);

    await runTransaction(db, async (transaction) => {
      const taskSnap = await transaction.get(taskRef);

      if (!taskSnap.exists()) {
        throw console.error("Task does not exist!");
      }

      transaction.update(taskRef, {
        isCompleted: updatedTasks[taskIndex].isCompleted,
      });

      // update local state inside the transaction
      setTasks(updatedTasks);
    });
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

  const handleOpenMenu = (taskId) => {
    setContextMenuOpen(taskId);
  };

  return (
    <div className="todo-container">
      <div className="separator">
        <h4>
          Tasks -{" "}
          {selectedDate
            ? selectedDate.toLocaleDateString()
            : "No date selected"}
        </h4>
        <CreateTask selectedDate={selectedDate} />
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
                <div className="menu">
                  <i
                    className="bx bx-dots-vertical-rounded menu-button"
                    onClick={() => handleOpenMenu(task.id)}
                  ></i>
                  {contextMenuOpen === task.id && (
                    <div
                      className="context-menu"
                      onBlur={() => setContextMenuOpen(null)}
                      tabIndex="0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button>Mark as Complete</button>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  )}
                </div>
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
              <i className="bx bx-chevron-left"></i>
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
              <i className="bx bx-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
