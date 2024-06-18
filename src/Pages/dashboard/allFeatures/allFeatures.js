import React from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase.js";
import { useNavigate } from "react-router-dom";

import { Sidebar } from '../../../components/Layout/Sidebar/Sidebar.js';

import { AllFeatures } from '../../../components/dashboard/allFeatures/allFeatures.js';
import { Profile } from '../../../components/dashboard/overview/right-section/profile/profile.js';
import { WhatsNew } from '../../../components/dashboard/allFeatures/whatsNew.js';

const AllFeaturesPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div>
      <div className="dashboard-container">
        <Sidebar />
        <main>
          <AllFeatures />
        </main>
        <aside className="right-section">
          <Profile />
          <WhatsNew />
        </aside>
      </div>
    </div>
  );
}

export default AllFeaturesPage;