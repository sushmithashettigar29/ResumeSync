import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./ProfilePage.module.css";
import axios from "axios";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false); // Toggle edit/view mode
  const [newUsername, setNewUsername] = useState(localStorage.getItem("username"));
  const [newEmail, setNewEmail] = useState(localStorage.getItem("email"));
  const [newBio, setNewBio] = useState(localStorage.getItem("bio") || "");
  const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profilePhoto") || ""); // Photo URL
  const [selectedFile, setSelectedFile] = useState(null); // File selected by the user
  const [previewPhoto, setPreviewPhoto] = useState(profilePhoto || ""); // Temporary preview of selected photo
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { name, email, bio, profilePhoto } = response.data.user;
        setNewUsername(name);
        setNewEmail(email);
        setNewBio(bio || "");
        setProfilePhoto(profilePhoto || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
  
    fetchProfile();
  }, [profilePhoto]); // Re-fetch data whenever profile photo is updated
  

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file)); // Generate preview
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("username", newUsername);
      formData.append("email", newEmail);
      formData.append("bio", newBio);
      if (selectedFile) {
        formData.append("profilePhoto", selectedFile);
      }

      const response = await axios.put("http://localhost:5000/api/auth/profile", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      // Update state and localStorage with new data
      const { name, email, bio, profilePhoto } = response.data.user;
      localStorage.setItem("username", name);
      localStorage.setItem("email", email);
      localStorage.setItem("bio", bio || "");
      localStorage.setItem("profilePhoto", profilePhoto || "");
      setProfilePhoto(profilePhoto || "");
      alert("Profile updated successfully!");
      setIsEditing(false);
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
              src={previewPhoto || "https://via.placeholder.com/150"}
              alt="User"
              className={styles["profile-avatar"]}
            />
            {isEditing && (
              <input
                type="file"
                id="profilePhoto"
                onChange={handleFileChange}
                className={styles["input"]}
                accept="image/png, image/jpeg, image/jpg"
              />
            )}
            <h1 className={styles["profile-name"]}>{newUsername}</h1>
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
                value={newEmail}
                disabled={!isEditing}
                onChange={(e) => setNewEmail(e.target.value)}
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
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
