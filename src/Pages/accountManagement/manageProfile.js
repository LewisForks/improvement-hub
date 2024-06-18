import React from "react";
import { ManageProfile } from "../../components/accountManagement/manageProfile";
import "../accountManagement/Auth.css";
import "../../App.css";

import { Header } from "../../components/Layout/Header/Header";

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