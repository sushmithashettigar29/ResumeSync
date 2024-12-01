import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <NavBar />
      <div className={styles.aboutPageContainer}>
        <div className={styles.aboutPageContent}>
          {/* Left Container */}
          <div className={styles.leftContainer}>
            <h1 className={styles.heading}>
              About <span>ResumeSync</span>
            </h1>
            <p className={styles.text}>
              ResumeSync is your go-to solution for creating professional,
              ATS-optimized resumes. Our platform is designed to simplify the
              resume-building process, ensuring you stand out in a competitive
              job market.
            </p>
            <p className={styles.text}>
              Whether you're starting fresh or enhancing an existing resume, we
              provide tools to help you succeed in landing your dream job.
            </p>

            <h3><span>Why Choose ResumeSync?</span></h3>
            <ul>
              <li>ATS Compatibility Optimization</li>
              <li>Multiple Format Support (PDF, DOCX)</li>
              <li>Skill Gap Analysis and Recommendations</li>
              <li>User-Friendly Interface</li>
            </ul>
          </div>

          {/* Right Container */}
          <div className={styles.rightContainer}></div>
        </div>
      </div>
    </>
  );
};

export default About;
