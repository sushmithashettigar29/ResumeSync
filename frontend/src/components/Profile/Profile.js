import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./ProfilePage.module.css";
import axios from "axios";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle between edit and view mode
  const [newUsername, setNewUsername] = useState(
    localStorage.getItem("username")
  );
  const [newEmail, setNewEmail] = useState(localStorage.getItem("email"));
  const [newBio, setNewBio] = useState(localStorage.getItem("bio") || "");
  const [profilePhoto, setProfilePhoto] = useState(
    localStorage.getItem("profilePhoto") || ""
  ); // Photo URL
  const [selectedFile, setSelectedFile] = useState(null); // File selected by the user
  const [previewPhoto, setPreviewPhoto] = useState(profilePhoto || ""); // Temporary preview of the selected photo
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user profile from the backend
        const response = await axios.get(
          "http://localhost:5000/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update state with fetched profile data
        const { name, email, bio, profilePhoto } = response.data.user;
        setNewUsername(name);
        setNewEmail(email);
        setNewBio(bio || "");
        setProfilePhoto(profilePhoto || "");
        setPreviewPhoto(profilePhoto || ""); // Set preview to the fetched photo

        // Update localStorage to keep profile data
        localStorage.setItem("username", name);
        localStorage.setItem("email", email);
        localStorage.setItem("bio", bio || "");
        localStorage.setItem("profilePhoto", profilePhoto || "");
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []); // Run only once when the component mounts

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Store the selected file
    if (file) {
      setPreviewPhoto(URL.createObjectURL(file)); // Generate a preview URL
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

      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update localStorage with the new profile data
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("bio", response.data.user.bio);
      localStorage.setItem(
        "profilePhoto",
        response.data.user.profilePhoto || ""
      );
      // Save photo URL
      console.log(response.data);

      alert("Profile updated successfully!");
      setProfilePhoto(response.data.user.profilePhoto); // Update displayed photo
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
              src={previewPhoto || "https://via.placeholder.com/150"} // Show preview or placeholder
              alt="User"
              className={styles["profile-avatar"]}
            />
            <div className={styles["profile-field"]}>
              <label htmlFor="profilePhoto"></label>
              {isEditing && (
                <input
                  type="file"
                  id="profilePhoto"
                  onChange={handleFileChange}
                  className={styles["input"]}
                  accept="image/png, image/jpeg, image/jpg"
                />
              )}
            </div>
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
              <button
                className={styles["edit-button"]}
                onClick={handleEditToggle}
              >
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
