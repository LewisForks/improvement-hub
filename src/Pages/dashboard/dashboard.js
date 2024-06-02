import React from "react";
import "../../App.css";
import "./dashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

import { Sidebar } from "../../components/Layout/Sidebar/Sidebar";

import { DashboardHeader } from "../../components/dashboard/main/header/header.js";
import { Goals } from "../../components/dashboard/main/goals/goals.js";
import { Friends } from "../../components/dashboard/main/friends/friends.js";
import { Profile } from "../../components/dashboard/right-section/profile/profile.js";
import { AccountDetails } from "../../components/dashboard/right-section/account-details/account-details.js";
import { AccountStatistics } from "../../components/dashboard/right-section/account-statistics/account-statistics.js";



const Dashboard = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return loading ? <div>Loading...</div> : null;
  }
  
  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div>
      <div className="container">
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
