import React from "react";
import { Register } from "../../components/account-management/register";
import "./Auth.css";
import "../../App.css";

import { Header } from "../../components/Layout/Header";

const RegisterPage = () => {
  return (
    <div>
      <Header />
      <div className="form-wrapper">
        <div className="form-container">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
