import React from "react";
import "../../../App.css";
import "./overview.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase.js";
import { useNavigate } from "react-router-dom";

import { Sidebar } from "../../../components/Layout/Sidebar/Sidebar.js";

import { DashboardHeader } from "../../../components/dashboard/overview/main/header/header.js";
import { Goals } from "../../../components/dashboard/overview/main/goals/goals.js";
import { Friends } from "../../../components/dashboard/overview/main/friends/friends.js";
import { Profile } from "../../../components/dashboard/overview/right-section/profile/profile.js";
import { AccountDetails } from "../../../components/dashboard/overview/right-section/account-details/account-details.js";
import { AccountStatistics } from "../../../components/dashboard/overview/right-section/account-statistics/account-statistics.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className="overview">
      <div className="dashboard-container">
        <Sidebar />
        <main>
          <DashboardHeader />
          <Goals />
          <Friends />
        </main>

        <aside className="right-section">
          <Profile />
          <AccountDetails />
          <AccountStatistics />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
