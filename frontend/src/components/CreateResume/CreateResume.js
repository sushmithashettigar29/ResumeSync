import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import styles from "./CreateResume.module.css"; // Import CSS Module

function CreateResume() {
  const navigate = useNavigate();

  const navigateToPersonalInfo = () => {
    navigate("/new-resume-details");
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <h1 className={styles.title}>Create Resume is working!</h1>
        <button onClick={navigateToPersonalInfo} className={styles.button}>
          Let's Start
        </button>
      </div>
    </>
  );
}

export default CreateResume;
