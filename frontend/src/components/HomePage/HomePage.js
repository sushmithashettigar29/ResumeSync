import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToNewResume = () => {
    navigate("/new-resume");
  };

  const navigateToEnhanceResume = () => {
    navigate("/enhance-resume");
  };

  return (
    <>
      <NavBar />
      <div className={styles.homePageContainer}>
        <div className={styles.homePageContent}>
          <h1 className={styles.heading}>Welcome to ResumeSync</h1>
          <p className={styles.paragraph}>
            Take control of your career with a standout resume! Whether you’re
            starting from scratch or enhancing your current resume, ResumeSync
            is here to help you create the perfect profile for job applications.
          </p>
          <h3 className={styles.subHeading}>
            Do you want to enhance your resume for job applications? Then why
            are you waiting? Just start creating your resume!
          </h3>
          <div className={styles.buttonGroup}>
            <button
              className={styles.primaryButton}
              onClick={navigateToNewResume}
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
