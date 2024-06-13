import "./Sidebar.css";
import { useLocation, Link } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="left-section">
      <div className="logo">
        <button className="menu-btn" id="menu-close">
          <i className="bx bx-log-out-circle"></i>
        </button>
        {/* <img alt="logo" src="" /> */}
        <Link to="/dashboard">ImproveHub</Link>
      </div>

      <div className="sidebar">
        <div className="item" id={location.pathname === "/dashboard" ? "active" : ""}>
          <i className="bx bx-home-alt-2"></i>
          <Link to="/dashboard">Overview</Link>
        </div>
        <div className="item" id={location.pathname === "/dashboard/features" ? "active" : ""}>
          <i className="bx bx-grid-alt"></i>
          <Link to="">All Features</Link>
        </div>
        <div className="item" id={location.pathname === "/dashboard/resources" ? "active" : ""}>
          <i className="bx bx-folder"></i>
          <Link to="#">Resources</Link>
        </div>
        <div className="item" id={location.pathname === "/dashboard/support" ? "active" : ""}>
          <i className="bx bx-message-square-dots"></i>
          <Link to="#">Support</Link>
        </div>
        <div className="item" id={location.pathname === "/dashboard/settings" ? "active" : ""}>
          <i className="bx bx-cog"></i>
          <Link to="#">Settings</Link>
        </div>
      </div>

      <div className="upgrade">
        <h5>Want all features?</h5>
        <div className="link">
          <Link to="#">
            Upgrade to <b>PRO</b>
          </Link>
          <i className="bx bxs-chevron-right"></i>
        </div>
      </div>
    </aside>
  );
};
