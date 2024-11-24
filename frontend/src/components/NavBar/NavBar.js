import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const [auth, setAuth] = useState(true); // Assume user is authenticated
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState(""); // For storing the logged-in username
  const navigate = useNavigate();

  // Retrieve username from localStorage when the component loads
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      setAuth(false); // If no username found, set auth to false
    }
  }, []);

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem("username"); // Remove username from localStorage
    localStorage.removeItem("token"); // Remove token as well
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

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
              <span className={styles.navbarLink} onClick={handleProfile}>
                {username} {/* Display the logged-in username */}
              </span>
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
