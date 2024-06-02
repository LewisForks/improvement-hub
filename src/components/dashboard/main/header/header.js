import "./header.css";

export const DashboardHeader = () => {
  return (
    <header>
      <button className="menu-btn" id="menu-open">
        <i className="bx bx-menu"></i>
      </button>
      <h5>
        Hello <b>Lewis</b>, welcome back!
      </h5>
    </header>
  );
};
