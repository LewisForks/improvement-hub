import "./accountStatistics.css";

export const AccountStatistics = () => {
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
            <h3>0</h3>
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
