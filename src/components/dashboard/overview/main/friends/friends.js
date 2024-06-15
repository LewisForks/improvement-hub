import './friends.css';

export const Friends = () => {
    return (
        <div>
            <div className="separator">
              <div className="info">
                <h3>Friends</h3>
                <a href="#">View All</a>
              </div>
            </div>

            <div className="friends">
              <div className="item">
                <div className="left">
                  <div className="icon">
                    <img src="" alt="icon?" />
                  </div>
                  <div className="details">
                    <h5>MobExe</h5>
                    <p>56 Points</p>
                    <p>Last Active: 43 minutes ago</p>
                  </div>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </div>
              <div className="item">
                <div className="left">
                  <div className="icon">
                    <img src="" alt="icon?" />
                  </div>
                  <div className="details">
                    <h5>Jerry</h5>
                    <p>45 Points</p>
                    <p>Last Active: 20 minutes ago</p>
                  </div>
                </div>
                <i className="bx bx-dots-vertical-rounded"></i>
              </div>
            </div>
          </div>
    );
};