import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase";

import Home from "./Pages/Home";
import LoginPage from "./Pages/account-management/login";
import RegisterPage from "./Pages/account-management/register";
import ManageProfile from "./Pages/profile-management/manageProfile";
import Dashboard from "./Pages/dashboard/dashboard";
import ManageGoals from "./Pages/profile-management/manageGoals";

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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
