import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./ProfilePage.module.css"; // Import the CSS Module

const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <div className={styles["profile-container"]}>
        <div className={styles["profile-card"]}>
          <div className={styles["profile-header"]}>
            <img
              src="https://www.example.com/avatar.jpg"
              alt="User"
              className={styles["profile-avatar"]}
            />
            <h1 className={styles["profile-name"]}>John Doe</h1>
            <p className={styles["profile-title"]}>
              Software Engineer | React Developer | AI Enthusiast
            </p>
          </div>

          <div className={styles["profile-details"]}>
            <div className={styles["profile-field"]}>
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value="John Doe"
                disabled
                readOnly
                className={styles["input"]}
              />
            </div>
            <div className={styles["profile-field"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value="johndoe@example.com"
                disabled
                readOnly
                className={styles["input"]}
              />
            </div>
            <div className={styles["profile-field"]}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                rows="4"
                value="I am a passionate developer with experience in ReactJS and AI technologies. I love coding, learning new things, and solving real-world problems."
                disabled
                readOnly
                className={styles["input"]}
              />
            </div>
          </div>

          <div className={styles["profile-actions"]}>
            <button className={styles["edit-button"]}>Edit Profile</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
