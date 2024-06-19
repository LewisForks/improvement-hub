import React from "react";
import { Goals } from "../../../components/profileManagement/manageGoals/goals";
import "../../../App.css";
import "./manageGoals.css";

import { Sidebar } from "../../../components/Layout/Sidebar/Sidebar";

const ManageGoalsPage = () => {
  return (
    <div>
      <div className="goals-container">
        <Sidebar />
        <div className="manage-goals">
          <Goals />
        </div>
      </div>
    </div>
  );
};

export default ManageGoalsPage;
