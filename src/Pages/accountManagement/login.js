import React from "react";
import { Login } from "../../components/accountManagement/login";
import './Auth.css';
import '../../App.css';

import { Header } from "../../components/Layout/Header/Header";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="form-wrapper">
        <div className="form-container">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
