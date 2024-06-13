import "./Sidebar.css";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

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
        <div className="item" id={location.pathname === "/dashboard" ? "active" : ""}>
          <i className="bx bx-home-alt-2"></i>
          <a href="#">Overview</a>
        </div>
        <div className="item" id={location.pathname === "/dashboard/features" ? "active" : ""}>
          <i className="bx bx-grid-alt"></i>
          <a href="">All Features</a>
        </div>
        <div className="item" id={location.pathname === "/dashboard/resources" ? "active" : ""}>
          <i className="bx bx-folder"></i>
          <a href="#">Resources</a>
        </div>
        <div className="item" id={location.pathname === "/dashboard/support" ? "active" : ""}>
          <i className="bx bx-message-square-dots"></i>
          <a href="#">Support</a>
        </div>
        <div className="item" id={location.pathname === "/dashboard/settings" ? "active" : ""}>
          <i className="bx bx-cog"></i>
          <a href="#">Settings</a>
        </div>
      </div>

      <div className="upgrade">
        <h5>Want all features?</h5>
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
