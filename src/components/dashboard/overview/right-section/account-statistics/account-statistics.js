import "./account-statistics.css";

export const AccountStatistics = () => {
  return (
    <div>
      <div className="separator">
        <h4>Account Statistics</h4>
      </div>

      <div className="stats">
        <div className="item">
          <div className="top">
            <p>Current</p>
            <p>Account Plan</p>
          </div>
          <div className="bottom">
            <div className="line"></div>
            <h3>Basic</h3>
          </div>
        </div>
        <div className="item">
          <div className="top">
            <p>Workouts</p>
            <p>Completed</p>
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
            <p>Habits Left</p>
            <p>To Complete</p>
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
