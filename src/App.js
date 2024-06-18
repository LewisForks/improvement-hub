import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./Pages/Home";
import LoginPage from "./Pages/accountManagement/login";
import RegisterPage from "./Pages/accountManagement/register";
import ManageProfile from "./Pages/accountManagement/manageProfile";
import Dashboard from "./Pages/dashboard/overview/overview";
import ManageGoals from "./Pages/profileManagement/manageGoals/manageGoals";
import AllFeaturesPage from "./Pages/dashboard/allFeatures/allFeatures";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account/manage" element={<ManageProfile />} />
        <Route path="/account/goals" element={<ManageGoals />} />
        <Route path="/dashboard/all-features" element={<AllFeaturesPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
