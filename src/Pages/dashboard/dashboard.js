import React from "react";
import "../../App.css";
import "./dashboard.css";

import { Header } from "../../components/Layout/Header";

const Dashboard = () => {
  return (
    <div>
      <div className="container">
        <aside className="left-section">
          <div className="logo">
            <button className="menu-btn" id="menu-close">
              <i className="bx bx-log-out-circle"></i>
            </button>
            {/* <img alt="logo" src="" /> */}
            <a href="/dashboard">ImproveHub</a>
          </div>

          <div className="sidebar">
            <div className="item" id="active">
              <i className="bx bx-home-alt-2"></i>
              <a href="#">Overview</a>
            </div>
            <div className="item">
              <i className="bx bx-grid-alt"></i>
              <a href="">All Features</a>
            </div>
            <div className="item">
              <i className="bx bx-folder"></i>
              <a href="#">Resources</a>
            </div>
            <div className="item">
              <i className="bx bx-message-square-dots"></i>
              <a href="#">Support</a>
            </div>
            <div className="item">
              <i className="bx bx-cog"></i>
              <a href="#">Settings</a>
            </div>
          </div>

          <div className="upgrade">
            <h5>Got More Pets?</h5>
            <div className="link">
              <a href="#">
                Upgrade to <b>PRO</b>
              </a>
              <i className="bx bxs-chevron-right"></i>
            </div>
          </div>
        </aside>

        <main>
          <header>
            <button className="menu-btn" id="menu-open">
              <i className="bx bx-menu"></i>
            </button>
            <h5>
              Hello <b>Lewis</b>, welcome back!
            </h5>
          </header>

          <div className="separator">
            <div className="info">
              <h3>My Goals</h3>
              <a className="btn" href="/account/create-pet-profile">
                <button>Create New</button>
              </a>
              <a href="#">View All</a>
            </div>
          </div>

          <div className="pets">
            <div className="item">
              <div className="progress">
                <div className="info">
                  <h5>Lose Fat</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis dictum nisl augue, vitae accumsan odio imperdiet et.
                  </p>
                </div>
                {/* <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div> */}
              </div>
              <img className="qrcode" src="" alt="" />
            </div>
            <div className="item" id="notfound">
              <div className="progress">
                <div className="info">
                  <h5>No Goals Found</h5>
                  <p>
                    <a href="/account/create-pet-profile">Create one</a> now!
                  </p>
                </div>
              </div>
              <i className="bx bx-x"></i>
            </div>
          </div>

          <div className="separator">
            <div className="info">
              <h3>Friends</h3>
              <a href="#">View All</a>
            </div>
          </div>

          <div className="contacts">
            <div className="item">
              <div className="left">
                <div className="icon">
                  <img src="" alt="icon?" />
                </div>
                <div className="details">
                  <h5>MobExe</h5>
                  <p>56 Points</p>
                  <p>Last Active: 43 minutes ago</p>
                </div>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </div>
            <div className="item">
              <div className="left">
                <div className="icon">
                  <img src="" alt="icon?" />
                </div>
                <div className="details">
                  <h5>Jerry</h5>
                  <p>45 Points</p>
                  <p>Last Active: 20 minutes ago</p>
                </div>
              </div>
              <i className="bx bx-dots-vertical-rounded"></i>
            </div>
          </div>
        </main>

        <aside className="right-section">
          <div className="top">
            <i className="bx bx-bell"></i>
            <div className="profile">
              <div className="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" />
                <div className="user">
                  <h5>username</h5>
                  <a href="#">Basic Plan</a>
                </div>
              </div>
              <i className="bx bxs-chevron-right"></i>
            </div>
          </div>

          <div className="separator" id="first">
            <h4>Account Details</h4>
          </div>

          <div className="account-details-container">
            <div className="error-message" id="nameError"></div>
            <div className="error-message" id="emailError"></div>
            <div className="error-message" id="passwordError"></div>
            <div className="error-message" id="dateOfBirthError"></div>
            <div className="account-details">
              <div className="left-details">
                <h2>Name:</h2>
                <h2>Email</h2>
                <h2>Password:</h2>
                <h2>Date Of Birth:</h2>
                <h2 id="confirmPasswordText" style={{ display: "none" }}>
                  Current Password:
                </h2>
              </div>
              <div className="right-details">
                <p>username</p>
                <p>user email</p>
                <p>•••••••••••••</p>
                <p>user DOB</p>
              </div>
              <div className="right-details-form" style={{ display: "none" }}>
                <form method="POST" id="accountDetailsForm">
                  <div className="input-container">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value="<%= userData.name %>"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value="<%= userData.email %>"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter New Password"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value="<%= userData.dob %>"
                      required
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Current Password"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="account-details-btns">
              <button id="editBtn">Edit</button>
              <button id="submitBtn" style={{ display: "none" }}>
                Submit
              </button>
              <button id="cancelBtn" style={{ display: "none" }}>
                Cancel
              </button>
            </div>
          </div>

          <div className="separator">
            <h4>Account Statistics</h4>
          </div>

          <div className="stats">
            <div className="item">
              <div className="top">
                <p>Current</p>
                <p>Account Plan</p>
              </div>
              <div className="bottom">
                <div className="line"></div>
                <h3>Basic</h3>
              </div>
            </div>
            <div className="item">
              <div className="top">
                <p>Workouts</p>
                <p>Completed</p>
              </div>
              <div className="bottom">
                <div className="line"></div>
                <h3>0</h3>
              </div>
            </div>
            <div className="item">
              <div className="top">
                <p>Books Read</p>
              </div>
              <div className="bottom">
                <div className="line"></div>
                <h3>0</h3>
              </div>
            </div>
            <div className="item">
              <div className="top">
                <p>Habits Left</p>
                <p>To Complete</p>
              </div>
              <div className="bottom">
                <div className="line"></div>
                <h3>0</h3>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
