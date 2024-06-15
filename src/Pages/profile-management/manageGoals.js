import React from "react";
import { ManageGoals } from "../../components/profile-management/manageGoals";
import { Goals } from "../../components/dashboard/overview/main/goals/goals";
import "../account-management/Auth.css";
import "../../App.css";
import "./manageGoals.css";

import { Sidebar } from "../../components/Layout/Sidebar/Sidebar";

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
