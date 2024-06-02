import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
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

  const handleNewGoal = () => {
    if (goals.length >= 4) {
      setErrorMessage("You can only have 4 goals at a time. Mark one as complete or delete one to create a new one.");
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

  return (
    <div>
      <div className="separator">
        <div className="info">
          <h3>My Goals</h3>
          <button className="btn" onClick={handleNewGoal}>
            Create New
          </button>
          <a href="#">View All</a>
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
            </div>
          ))
        ) : (
          <div className="item" id="notfound">
            <div className="info">
              <h5>No Goals Found</h5>
              <p>
                <a onClick={() => setModalIsOpen(true)}>Create one</a>{" "}
                now!
              </p>
            </div>
            <i className="bx bx-x"></i>
          </div>
        )}
      </div>
    </div>
  );
};
