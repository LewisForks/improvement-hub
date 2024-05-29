import React from "react";
import { Login } from "../../components/Auth/Login";
import './Auth.css';
import '../../App.css';

const LoginPage = () => {
  return (
    <div>
      <div class="form-wrapper">
        <div class="form-container">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
