import './Sidebar.css';

export const Sidebar = () => {
    return (
        <aside className="left-section">
          <div className="logo">
            <button className="menu-btn" id="menu-close">
              <i className="bx bx-log-out-circle"></i>
            </button>
            {/* <img alt="logo" src="" /> */}
            <a href="/dashboard">ImproveHub</a>
          </div>

          <div className="sidebar">
            <div className="item" id="active">
              <i className="bx bx-home-alt-2"></i>
              <a href="#">Overview</a>
            </div>
            <div className="item">
              <i className="bx bx-grid-alt"></i>
              <a href="">All Features</a>
            </div>
            <div className="item">
              <i className="bx bx-folder"></i>
              <a href="#">Resources</a>
            </div>
            <div className="item">
              <i className="bx bx-message-square-dots"></i>
              <a href="#">Support</a>
            </div>
            <div className="item">
              <i className="bx bx-cog"></i>
              <a href="#">Settings</a>
            </div>
          </div>

          <div className="upgrade">
            <h5>Got More Pets?</h5>
            <div className="link">
              <a href="#">
                Upgrade to <b>PRO</b>
              </a>
              <i className="bx bxs-chevron-right"></i>
            </div>
          </div>
        </aside>
    );
};