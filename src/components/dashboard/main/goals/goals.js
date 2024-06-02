import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Modal from "react-modal";
import "./goals.css";
import "./createGoalModal.css";

Modal.setAppElement("#root"); // This line is needed for accessibility reasons

export const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("err");
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");

  const [menuOpen, setMenuOpen] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (auth.currentUser) {
      const q = query(
        collection(db, "goals"),
        where("userId", "==", auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const goalsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGoals(goalsData);
      });

      // Clean up the onSnapshot listener
      return () => unsubscribe();
    }
  }, [auth, db]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        !event.target.closest(".context-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setMenuOpen(null);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Clean up the event listener on unmount
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const handleNewGoal = () => {
    if (goals.length >= 4) {
      setErrorMessage(
        "You can only have 4 goals at a time. Mark one as complete or delete one to create a new one."
      );
      setErrorModalIsOpen(true);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleCreateNewGoal = async () => {
    await addDoc(collection(db, "goals"), {
      title: newGoalTitle,
      description: newGoalDescription,
      userId: auth.currentUser.uid,
    });
    setModalIsOpen(false);
    setNewGoalTitle("");
    setNewGoalDescription("");
  };

  const handleCloseNewGoal = () => {
    setModalIsOpen(false);
    setNewGoalTitle("");
    setNewGoalDescription("");
  };

  const handleOpenMenu = (goalId) => {
    setMenuOpen(goalId);
  };

  // Handle "Mark as Complete"
  const handleCompleteGoal = (goalId) => {
    // Update the goal's status to "complete"
  };

  // Handle "Edit"
  const handleEditGoal = (goalId) => {
    // Open the edit modal for the selected goal
  };

  // Delete the selected goal
  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteDoc(doc(db, "goals", goalId));
    } catch (error) {
      console.error("Error deleting goal: ", error);
    }
  };

  return (
    <div>
      <div className="separator">
        <div className="info">
          <h3>My Goals</h3>
          <button className="btn" onClick={handleNewGoal}>
            Create New
          </button>
          <a href="#">Manage Goals</a>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Create New Goal</h2>
        <form>
          <input
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            placeholder="Goal Title"
          />
          <textarea
            value={newGoalDescription}
            onChange={(e) => setNewGoalDescription(e.target.value)}
            placeholder="Goal Description"
          />
        </form>
        <div>
          <button onClick={handleCreateNewGoal}>Submit</button>
          <button onClick={() => handleCloseNewGoal()}>Close</button>
        </div>
      </Modal>

      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
      >
        <h2>Oops...</h2>
        <p>{errorMessage}</p>
        <div>
          <button onClick={() => setErrorModalIsOpen(false)}>Dismiss</button>
        </div>
      </Modal>

      <div className="goals">
        {goals.length > 0 ? (
          goals.slice(0, 4).map((goal) => (
            <div className="item" key={goal.id}>
              <div className="info">
                <h5>{goal.title}</h5>
                <p>{goal.description}</p>
              </div>
              <div className="menu">
                <i
                  className="bx bx-dots-vertical-rounded menu-button"
                  onClick={() => handleOpenMenu(goal.id)}
                ></i>
                {menuOpen === goal.id && (
                  <div
                    className="context-menu"
                    onBlur={() => setMenuOpen(null)}
                    tabIndex="0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button onClick={() => handleCompleteGoal(goal.id)}>
                      Mark as Complete
                    </button>
                    <button onClick={() => handleEditGoal(goal.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteGoal(goal.id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="item" id="notfound">
            <div className="info">
              <h5>No Goals Found</h5>
              <p>
                <a onClick={() => setModalIsOpen(true)}>Create one</a> now!
              </p>
            </div>
            <i className="bx bx-x"></i>
          </div>
        )}
      </div>
    </div>
  );
};
