import React from 'react';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../config/firebase.js";
import { useNavigate } from "react-router-dom";

import { Sidebar } from '../../../components/Layout/Sidebar/Sidebar.js';

import { FeatureList } from '../../../components/dashboard/allFeatures/featureList/featureList.js';
import { Profile } from '../../../components/dashboard/overview/right-section/profile/profile.js';
import { WhatsNew } from '../../../components/dashboard/allFeatures/whatsNew/whatsNew.js';
import { AccountStatistics } from "../../../components/dashboard/allFeatures/accountStatistics/accountStatistics.js";

const AllFeaturesPage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/signin");
    return null;
  }

  return (
    <div className='all-features'>
      <div className="dashboard-container">
        <Sidebar />
        <main>
          <FeatureList />
        </main>
        <aside className="right-section">
          <Profile />
          <WhatsNew />
          <AccountStatistics />
        </aside>
      </div>
    </div>
  );
}

export default AllFeaturesPage;