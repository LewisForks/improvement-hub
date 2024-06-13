import React from "react";
import { ManageGoals } from "../../components/profile-management/manageGoals";
import "../account-management/Auth.css";
import "../../App.css";


import { Sidebar } from "../../components/Layout/Sidebar/Sidebar";
import '../../components/Layout/Sidebar/Sidebar.css'

const ManageGoalsPage = () => {
  return (
    <div>
      <Sidebar />
      <ManageGoals />
    </div>
  );
};

export default ManageGoalsPage;