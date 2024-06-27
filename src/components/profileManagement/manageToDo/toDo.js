import "./toDo.css";
import { useEffect, useState, useMemo } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  query,
  where,
  collection,
  doc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db, auth } from "../../../config/firebase";

import { CreateTask } from "./createTask";

export const ToDo = ({ selectedDate }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [contextMenuOpen, setContextMenuOpen] = useState(null);
  const [taskCreated, setTaskCreated] = useState(false);
  const tasksPerPage = 14;

  // Use local date to avoid timezone issues (i hate javascript :D)
  const localDate = useMemo(
    () =>
      new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      ),
    [selectedDate]
  );

  const formattedDate = localDate.toISOString().slice(0, 10);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        const q = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          where("taskDate", "in", [formattedDate, 0]),
          where("completedOn", "in", [formattedDate, 0])
        );
        getDocs(q)
          .then((snapshot) => {
            const tasksData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("Fetched Tasks from here:", tasksData);
            setTasks(tasksData);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching tasks: ", error);
            setLoading(false);
          });
      }
    });

    // Clean up the onAuthStateChanged listener
    return () => unsubscribe();
  }, [auth, db, formattedDate, taskCreated]);

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
    try {
      const taskRef = doc(db, "tasks", taskId);

      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(taskRef);
        if (!taskDoc.exists()) {
          throw new Error("Document does not exist!");
        }
        const isCompleted = taskDoc.data().isCompleted;

        // update local state immediately
        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !isCompleted } : task
          )
        );

        // update Firestore without re-rendering
        transaction.update(taskRef, {
          isCompleted: !isCompleted,
          completedOn: isCompleted ? 0 : formattedDate,
        });
      });

      console.log("Transaction successfully committed!");
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  };

  const sortedTasks = tasks;

  // Paginate sorted tasks
  const paginateTasks = () => {
    const start = page * tasksPerPage;
    const end = start + tasksPerPage;
    return sortedTasks.slice(start, end);
  };

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

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
        <CreateTask selectedDate={selectedDate} onTaskCreated={() => setTaskCreated((prev) => !prev)} />
      </div>
      <div>
        <div className="tasks">
          {loading ? (
            <p>Loading...</p>
          ) : sortedTasks.length === 0 ? (
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
                    />
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
        {sortedTasks.length > tasksPerPage && (
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

export default ToDo;
