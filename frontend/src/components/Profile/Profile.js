import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./ProfilePage.module.css"; // Import the CSS Module
import axios from "axios";  // Import axios to make HTTP requests

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false); // State for toggle between edit/view
  const [newUsername, setNewUsername] = useState(localStorage.getItem("username"));
  const [newEmail, setNewEmail] = useState(localStorage.getItem("email"));
  const [newBio, setNewBio] = useState(localStorage.getItem("bio") || ""); 

  const [error, setError] = useState(null);  // State for error handling

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");  // Get token from localStorage
  
      // Send updated profile data to backend
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",  // Update URL to match backend route
        {
          username: newUsername,
          email: newEmail,
          bio: newBio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the JWT token to the request
          },
        }
      );
  
      localStorage.setItem("username", newUsername); // Update localStorage with the new username
      localStorage.setItem("email", newEmail); // Update localStorage with the new email
      localStorage.setItem("bio", newBio);
      alert("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError("Failed to update profile. Please try again.");
      console.error(err);
    }
  };
  

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
            <h1 className={styles["profile-name"]}>{newUsername}</h1>
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
                value={newUsername}
                disabled={!isEditing}
                onChange={(e) => setNewUsername(e.target.value)}
                className={styles["input"]}
              />
            </div>
            <div className={styles["profile-field"]}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={newEmail} // Display email here
                disabled={!isEditing}
                onChange={(e) => setNewEmail(e.target.value)} // Allow changes if in edit mode
                className={styles["input"]}
              />
            </div>
            <div className={styles["profile-field"]}>
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                rows="4"
                value={newBio}
                disabled={!isEditing}
                onChange={(e) => setNewBio(e.target.value)}
                className={styles["input"]}
              />
            </div>
          </div>

          <div className={styles["profile-actions"]}>
            {isEditing ? (
              <button className={styles["save-button"]} onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button className={styles["edit-button"]} onClick={handleEditToggle}>
                Edit Profile
              </button>
            )}
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}  {/* Display error message */}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
