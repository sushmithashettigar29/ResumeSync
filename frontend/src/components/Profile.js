import React from "react";
import NavBar from "./NavBar";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://www.example.com/avatar.jpg"
              alt="User"
              className="profile-avatar"
            />
            <h1 className="profile-name">John Doe</h1>
            <p className="profile-title">
              Software Engineer | React Developer | AI Enthusiast
            </p>
          </div>

          <div className="profile-details">
            <div className="profile-field">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value="John Doe"
                disabled
                readOnly
              />
            </div>
            <div className="profile-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value="johndoe@example.com"
                disabled
                readOnly
              />
            </div>
            <div className="profile-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                rows="4"
                value="I am a passionate developer with experience in ReactJS and AI technologies. I love coding, learning new things, and solving real-world problems."
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="profile-actions">
            <button className="edit-button">Edit Profile</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
