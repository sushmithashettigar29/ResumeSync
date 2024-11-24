import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./EnhanceResume.module.css";

function EnhanceResume() {
  const [formData, setFormData] = useState({
    resume: null,
    jobDescription: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Store the file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.resume) {
      alert("Please upload your resume in .docx or .pdf format.");
      return;
    }
    if (!formData.jobDescription) {
      alert("Please enter a job description.");
      return;
    }

    // Log form data (you can replace this with an API call or other actions)
    console.log("Form Submitted: ", formData);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Enhance Your Resume</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="resume" className={styles.label}>
                Upload Resume (.docx or .pdf):
              </label>
              <input
                type="file"
                name="resume"
                accept=".docx,.pdf"
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.row}>
              <textarea
                name="jobDescription"
                placeholder="Enter the job description..."
                value={formData.jobDescription}
                onChange={handleChange}
                rows="5"
                className={styles.textarea}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EnhanceResume;
