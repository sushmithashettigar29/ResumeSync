import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./HomePage.module.css";

const HomePage = () => {
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
      <div className={styles.homePageContainer}>
        <div className={styles.homePageContent}>
          {/* Left Container */}
          <div className={styles.leftContainer}>
            <h1 className={styles.heading}>
              ResumeSync's <span>Resume Builder</span> helps you get hired at
              top companies
            </h1>
            <p>
              Resumes tailored for applicant tracking systems (ATS) are
              optimized to increase visibility and improve chances of selection.
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
          </div>

          <div className={styles.rightContainer}></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
