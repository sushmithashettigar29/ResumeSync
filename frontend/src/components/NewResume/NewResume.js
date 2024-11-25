import React from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import styles from "./NewResume.module.css"; 
function NewResume() {
  const navigate = useNavigate();

  const navigateToPersonalInfo = () => {
    navigate("/new-resume-details");
  };

  return (
    <>
      <NavBar />
      <div className={styles.newResumeContainer}>
        <h1>Start Building Your New Resume</h1>
        <p>Begin your journey by entering your personal information.</p>
        <button className={styles.startButton} onClick={navigateToPersonalInfo}>
          Let's Start
        </button>
      </div>
    </>
  );
}

export default NewResume;
