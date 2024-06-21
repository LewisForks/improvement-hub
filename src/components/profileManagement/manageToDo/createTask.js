import React, { useState, useEffect, useMemo } from "react";

import { db, auth } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

import Modal from "react-modal";
import "./createTaskModal.css";
import { set } from "firebase/database";
Modal.setAppElement("#root"); // accessibility

export const CreateTask = ({ selectedDate }) => {
  const localDate = useMemo(
    () =>
      new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      ),
    [selectedDate]
  );
  const [newTaskModalIsOpen, setNewTaskModalIsOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(
    localDate.toISOString().slice(0, 10)
  );
  const [hasDueDate, setHasDueDate] = useState(false);

  useEffect(() => {
    setTaskDate(localDate.toISOString().slice(0, 10));
  }, [localDate]);

  const openNewTaskModal = () => {
    setNewTaskModalIsOpen(true);
  };

  const closeNewTaskModal = () => {
    setNewTaskModalIsOpen(false);
    setTaskName("");
    setTaskDescription("");
    setHasDueDate(false);
  };

  const handleCreateNewTask = async () => {
    if (!taskName) {
      alert("You need a task name to create a task!");
      return;
    }
    await addDoc(collection(db, "tasks"), {
      name: taskName,
      description: taskDescription,
      taskDate: taskDate,
      userId: auth.currentUser.uid,
    });
    setTaskName("");
    setTaskDescription("");
    setHasDueDate(false);
  };

  return (
    <div>
      <button onClick={openNewTaskModal}>Create New Task</button>
      <Modal
        isOpen={newTaskModalIsOpen}
        onRequestClose={() => setNewTaskModalIsOpen(false)}
      >
        <form>
          <label htmlFor="taskName">Task Name:</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <label htmlFor="taskDescription">Task Description:</label>
          <textarea
            id="taskDescription"
            name="taskDescription"
            placeholder="Task Description"
            value={taskDescription}
            maxLength={300}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div>
            <label htmlFor="taskDate">Due Date?</label>
            <input
              type="checkbox"
              id="hasDueDate"
              name="hasDueDate"
              checked={hasDueDate}
              onChange={(e) => setHasDueDate(e.target.checked)}
            />
          </div>
          {hasDueDate && (
            <input
              type="date"
              id="taskDate"
              name="taskDate"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
            />
          )}
        </form>
        <div>
          <button onClick={handleCreateNewTask} id="submitBtn">
            Create
          </button>
          <button onClick={closeNewTaskModal} id="submitBtn">
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
