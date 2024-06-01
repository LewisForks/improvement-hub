import React from "react";
import '../../App.css';

import { Header } from "../../components/Layout/Header";

const Dashboard = () => {
    return (
        <body>

    <div class="container">

        <aside class="left-section">
            <div class="logo">
                <button class="menu-btn" id="menu-close">
                    <i class='bx bx-log-out-circle'></i>
                </button>
             <img alt="logo" src=""/>
                <a href="/dashboard">CollarCode</a>
            </div>

            <div class="sidebar">
                <div class="item" id="active">
                    <i class='bx bx-home-alt-2'></i>
                    <a href="#">Overview</a>
                </div>
                <div class="item">
                    <i class='bx bx-grid-alt'></i>
                    <a href="">Pets</a>
                </div>
                <div class="item">
                    <i class='bx bx-folder'></i>
                    <a href="#">Resources</a>
                </div>
                <div class="item">
                    <i class='bx bx-message-square-dots'></i>
                    <a href="#">Support</a>
                </div>
                <div class="item">
                    <i class='bx bx-cog'></i>
                    <a href="#">Settings</a>
                </div>
            </div>

            <div class="upgrade">
                <h5>Got More Pets?</h5>
                <div class="link">
                    <a href="#">Upgrade to <b>PRO</b></a>
                    <i class='bx bxs-chevron-right'></i>
                </div>
            </div>

        </aside>

        <main id="swup" class="transition-fade">
            <header>
                <button class="menu-btn" id="menu-open">
                    <i class='bx bx-menu'></i>
                </button>
                <h5>Hello <b>
                        username
                    </b>, welcome back!</h5>
            </header>

            <div class="separator">
                <div class="info">
                    <h3>My Pets</h3>
                    <a class="btn" href="/account/create-pet-profile"><button>Create New</button></a>
                    <a href="#">View All</a>
                </div>
            </div>

            <div class="pets">
                        <div class="item">
                            <div class="progress">
                                <div class="info">
                                    <h5>
                                        pet name
                                    </h5>
                                    <p>pet breed
                                    </p>
                                </div>
                                <div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0"
                                    aria-valuemax="100"></div>
                            </div>
                            <img class="qrcode" src="" alt=""/>
                        </div>
                                <div class="item" id="notfound">
                                    <div class="progress">
                                        <div class="info">
                                            <h5>No Pets Found</h5>
                                            <p><a href="/account/create-pet-profile">Create one</a> now!</p>
                                        </div>
                                    </div>
                                    <i class='bx bx-x'></i>
                                </div>
            </div>

            <div class="separator">
                <div class="info">
                    <h3>Emergency Contacts</h3>
                    <a href="#">View All</a>
                </div>
            </div>

            <div class="contacts">
                <div class="item">
                    <div class="left">
                        <div class="icon">
                            <img src="" alt="icon?"/>
                        </div>
                        <div class="details">
                            <h5>Lewis Raybould</h5>
                            <p>07925 847498</p>
                            <p>lewis@raybould.co</p>
                        </div>
                    </div>
                    <i class='bx bx-dots-vertical-rounded'></i>
                </div>
                <div class="item">
                    <div class="left">
                        <div class="icon">
                            <img src="" alt="icon?"/>
                        </div>
                        <div class="details">
                            <h5>Jack Penis</h5>
                            <p>12345678</p>
                            <p>poopoo@emails.com</p>
                        </div>
                    </div>
                    <i class='bx bx-dots-vertical-rounded'></i>
                </div>
            </div>
        </main>

        <aside class="right-section">
            <div class="top">
                <i class='bx bx-bell'></i>
                <div class="profile">
                    <div class="left">
                        <img src="assets/profile.jpg"/>
                        <div class="user">
                            <h5>
                                username
                            </h5>
                            <a href="#">Basic Plan</a>
                        </div>
                    </div>
                    <i class='bx bxs-chevron-right'></i>
                </div>
            </div>

            <div class="separator" id="first">
                <h4>Account Details</h4>
            </div>

            <div class="account-details-container">
                <div class="error-message" id="nameError"></div>
                <div class="error-message" id="emailError"></div>
                <div class="error-message" id="passwordError"></div>
                <div class="error-message" id="dateOfBirthError"></div>
                <div class="account-details">
                    <div class="left-details">
                        <h2>Name:</h2>
                        <h2>Email</h2>
                        <h2>Password:</h2>
                        <h2>Date Of Birth:</h2>
                        <h2 id="confirmPasswordText" style="display:none;">Current Password:</h2>
                    </div>
                    <div class="right-details">
                        <p>
                            username
                        </p>
                        <p>
                            user email
                        </p>
                        <p>•••••••••••••</p>
                        <p>
                            user DOB
                        </p>
                    </div>
                    <div class="right-details-form" style="display:none;">
                        <form method="POST" id="accountDetailsForm">
                            <div class="input-container">
                                <input type="text" id="name" name="name" value="<%= userData.name %>" required/>
                            </div>
                            <div class="input-container">
                                <input type="email" id="email" name="email" value="<%= userData.email %>" required/>
                            </div>
                            <div class="input-container">
                                <input type="password" id="password" name="password" placeholder="Enter New Password"
                                    required/>
                            </div>
                            <div class="input-container">
                                <input type="date" id="dateOfBirth" name="dateOfBirth" value="<%= userData.dob %>"
                                    required/>
                            </div>
                            <div class="input-container">
                                <input type="password" id="confirmPassword" name="confirmPassword"
                                    placeholder="Confirm Current Password" required/>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="account-details-btns">
                    <button id="editBtn">Edit</button>
                    <button id="submitBtn" style="display:none;">Submit</button>
                    <button id="cancelBtn" style="display:none;">Cancel</button>
                </div>
            </div>

            <div class="separator">
                <h4>Account Statistics</h4>
            </div>

            <div class="stats">
                <div class="item">
                    <div class="top">
                        <p>Current</p>
                        <p>Account Plan</p>
                    </div>
                    <div class="bottom">
                        <div class="line"></div>
                        <h3>Basic</h3>
                    </div>
                </div>
                <div class="item">
                    <div class="top">
                        <p>Pet QR</p>
                        <p>Codes Created</p>
                    </div>
                    <div class="bottom">
                        <div class="line"></div>
                        <h3>0</h3>
                    </div>
                </div>
            </div>
        </aside>
    </div>
</body>
    );
}

export default Dashboard;