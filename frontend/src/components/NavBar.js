import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const [auth, setAuth] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
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
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigateTo("/home")}>
          ResumeSync
        </div>
        <nav className={`navbar-links ${drawerOpen ? "open" : ""}`}>
          {menuItems.map((item, index) => (
            <span
              key={index}
              className="navbar-link"
              onClick={() => navigateTo(item.path)}
            >
              {item.label}
            </span>
          ))}
          {auth && (
            <>
              <span className="navbar-link" onClick={handleProfile}>
                Profile
              </span>
              <span className="navbar-link" onClick={handleLogout}>
                Logout
              </span>
            </>
          )}
        </nav>
        <div
          className="navbar-menu-icon"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          ☰
        </div>
      </div>
    </header>
  );
}

export default NavBar;
