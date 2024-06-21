import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modal from "react-modal";
import "./goals.css";
import "./createGoalModal.css";

import { useLocation, Link } from "react-router-dom";

export const Goals = () => {
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("err");
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalDescription, setNewGoalDescription] = useState("");

  //edit goals

  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [updateGoalId, setUpdateGoalId] = useState(null);
  const [updateGoalTitle, setUpdateGoalTitle] = useState("");
  const [updateGoalDescription, setUpdateGoalDescription] = useState("");

  const [menuOpen, setMenuOpen] = useState(null);
  const location = useLocation();

  const incompleteGoals = goals.filter((goal) => !goal.completed);
  const completedGoals = goals.filter((goal) => goal.completed);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        const q = query(
          collection(db, "goals"),
          where("userId", "==", user.uid)
        );
        const unsubscribeSnapshot = onSnapshot(
          q,
          (snapshot) => {
            const goalsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setGoals(goalsData);
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
    if (incompleteGoals.length >= 4) {
      setErrorMessage(
        "You can only have 4 goals at a time. Mark one as complete or delete one to create a new one."
      );
      setErrorModalIsOpen(true);
    } else if (goals.length > 20) {
      setErrorMessage(
        "You have reached the maximum number of goals. Please delete some goals to create a new one."
      );
      setErrorModalIsOpen(true);
    } else {
      setModalIsOpen(true);
    }
  };

  const handleCreateNewGoal = async () => {
    if (!newGoalTitle) {
      setErrorMessage("You need a goal title to create a goal!");
      setErrorModalIsOpen(true);
      return;
    }

    await addDoc(collection(db, "goals"), {
      title: newGoalTitle,
      description: newGoalDescription,
      completed: false,
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

  const handleCompleteGoalToggle = async (goalId) => {
    try {
      const goalRef = doc(db, "goals", goalId);
      const goalDoc = await getDoc(goalRef);
      const isCompleted = goalDoc.data().completed;
      const incompleteGoalsCount = incompleteGoals.length;

      if (isCompleted && incompleteGoalsCount >= 4) {
        setErrorMessage(
          "You can only have 4 incomplete goals at a time. Mark one as complete or delete one to mark this goal as incomplete."
        );
        setErrorModalIsOpen(true);
      } else {
        await setDoc(goalRef, { completed: !isCompleted }, { merge: true });
      }
    } catch (error) {
      console.error("Error toggling goal completion: ", error);
    }
  };

  const handleEditGoal = (goalId) => {
    // finds selected goal information
    const selectedGoal = goals.find((goal) => goal.id === goalId);

    // opens and sets value for updateGoal modal
    setUpdateGoalId(goalId);
    setUpdateGoalTitle(selectedGoal.title);
    setUpdateGoalDescription(selectedGoal.description);
    setUpdateModalIsOpen(true);
  };

  const handleUpdateGoal = async (event) => {
    event.preventDefault();

    if (!updateGoalTitle) {
      setErrorMessage("You need a goal title to update a goal!");
      setErrorModalIsOpen(true);
      return;
    }

    try {
      await updateDoc(doc(db, "goals", updateGoalId), {
        title: updateGoalTitle,
        description: updateGoalDescription,
      });

      handleCloseUpdateGoal();
    } catch (error) {
      console.error("Error updating goal: ", error);
    }
  };

  const handleCloseUpdateGoal = () => {
    setUpdateModalIsOpen(false);
    setUpdateGoalId(null);
    setNewGoalTitle("");
    setNewGoalDescription("");
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
          <Link to="/account/goals">Manage Goals</Link>
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
        isOpen={updateModalIsOpen}
        onRequestClose={() => setUpdateModalIsOpen(false)}
      >
        <h2>Edit Goal</h2>
        <form>
          <input
            value={updateGoalTitle}
            onChange={(e) => setUpdateGoalTitle(e.target.value)}
            placeholder="Goal Title"
          />
          <textarea
            value={updateGoalDescription}
            onChange={(e) => setUpdateGoalDescription(e.target.value)}
            placeholder="Goal Description"
          />
        </form>
        <div>
          <button onClick={handleUpdateGoal}>Submit</button>
          <button onClick={() => handleCloseUpdateGoal()}>Close</button>
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
        {loading ? (
          <div>Loading...</div>
        ) : incompleteGoals.length > 0 ? (
          incompleteGoals.slice(0, 4).map((goal) => (
            <div className="item active" key={goal.id}>
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
                    <button onClick={() => handleCompleteGoalToggle(goal.id)}>
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
        {location.pathname === "/account/goals" &&
          completedGoals.length > 0 &&
          completedGoals.map((goal) => (
            <div className="item completed" key={goal.id}>
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
                    <button onClick={() => handleCompleteGoalToggle(goal.id)}>
                      Mark as Incomplete
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
          ))}
      </div>
    </div>
  );
};
