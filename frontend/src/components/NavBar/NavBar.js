import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const [auth, setAuth] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedUsername) {
      setUsername(storedUsername);
      setProfilePhoto(storedProfilePhoto);
    } else {
      setAuth(false);
    }
  }, []);

  const handleLogout = () => {
    setAuth(false);
    localStorage.clear();
    navigate("/");
  };

  const handleProfile = () => navigate("/profile");

  const navigateTo = (path) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const menuItems = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Create Resume", path: "/create-resume" },
  ];

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo} onClick={() => navigateTo("/home")}>
          ResumeSync
        </div>
        <nav
          className={`${styles.navbarLinks} ${drawerOpen ? styles.open : ""}`}
        >
          {menuItems.map((item, index) => (
            <span
              key={index}
              className={styles.navbarLink}
              onClick={() => navigateTo(item.path)}
            >
              {item.label}
            </span>
          ))}
          {auth && (
            <>
              <div className={styles.profileContainer}>
                <img
                  src={profilePhoto || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className={styles.profilePhoto}
                  onClick={handleProfile}
                />
                <span className={styles.navbarLink}>{username}</span>
              </div>
              <span className={styles.navbarLink} onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
        </nav>
        <div
          className={styles.navbarMenuIcon}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          ☰
        </div>
      </div>
    </header>
  );
}

export default NavBar;
