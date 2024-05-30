import React from "react";
import { ManageProfile } from "../../components/account-management/manage-profile";
import "./Auth.css";
import "../../App.css";

import { Header } from "../../components/Layout/Header";

const ManageProfilePage = () => {
  return (
    <div>
      <Header />
      <div className="form-wrapper">
        <div className="form-container">
          <ManageProfile />
        </div>
      </div>
    </div>
  );
}

export default ManageProfilePage;