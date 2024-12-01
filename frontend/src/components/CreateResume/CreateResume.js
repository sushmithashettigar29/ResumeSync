import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./CreateResume.module.css";

function CreateResume() {
  const navigate = useNavigate();

  const navigateToPersonalInfo = () => {
    navigate("/new-resume-details");
  };

  const navigateToEnhanceResume = () => {
    navigate("/enhance-resume");
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Craft Your Perfect Resume</h1>
        <p className={styles.subtitle}>
          Whether you're starting fresh or refining your existing resume, ResumeSync makes the process easy and effective.
        </p>
        <div className={styles.buttonGroup}>
          <button
            className={styles.primaryButton}
            onClick={navigateToPersonalInfo}
          >
            Create New Resume
          </button>
          <button
            className={styles.secondaryButton}
            onClick={navigateToEnhanceResume}
          >
            Enhance Existing Resume
          </button>
        </div>
        <p className={styles.footerText}>
          Need assistance? <a href="mailto:support@resumesync.com" className={styles.link}>Contact us</a>
        </p>
      </div>
    </>
  );
}

export default CreateResume;
