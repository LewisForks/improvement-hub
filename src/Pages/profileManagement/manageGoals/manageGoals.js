import React from "react";
import { Goals } from "../../../components/dashboard/overview/main/goals/goals";
import "../../accountManagement/Auth.css";
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
