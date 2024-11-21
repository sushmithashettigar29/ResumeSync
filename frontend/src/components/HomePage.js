import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/HomePage.css";

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
      <div className="home-page-container">
        <div className="home-page-content">
          <h1>Welcome to ResumeSync</h1>
          <p>
            Take control of your career with a standout resume! Whether you’re
            starting from scratch or enhancing your current resume, ResumeSync
            is here to help you create the perfect profile for job applications.
          </p>
          <h3>
            Do you want to enhance your resume for job applications? Then why
            are you waiting? Just start creating your resume!
          </h3>
          <div className="button-group">
            <button className="primary-button" onClick={navigateToNewResume}>
              Create New Resume
            </button>
            <button
              className="secondary-button"
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
