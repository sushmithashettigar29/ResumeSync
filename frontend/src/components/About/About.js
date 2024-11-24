import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "../About/About.module.css";  // Import the CSS module

function About() {
  return (
    <>
      <NavBar />
      <h1 className={styles.heading}>About is working!</h1>
    </>
  );
}

export default About;
