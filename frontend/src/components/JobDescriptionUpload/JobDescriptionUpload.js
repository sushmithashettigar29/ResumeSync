import React, { useState } from "react";
import styles from "./JobDescriptionUpload.module.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

const JobDescriptionUpload = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    file: null,
  });
  const navigate = useNavigate();

  // Debounced save function for form data
  const saveToLocalStorage = (updatedData) => {
    localStorage.setItem("jobDescriptionData", JSON.stringify(updatedData));
  };

  // Handle input changes for text and file
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevState) => {
        const updatedState = {
          ...prevState,
          file: files[0], // Store the selected file
        };
        saveToLocalStorage(updatedState); // Save to localStorage
        return updatedState;
      });
    } else {
      setFormData((prevState) => {
        const updatedState = {
          ...prevState,
          [name]: value,
        };
        saveToLocalStorage(updatedState); // Save to localStorage
        return updatedState;
      });
    }
  };

  // Simple validation for job description and file
  const validate = () => {
    if (!formData.jobTitle || (!formData.jobDescription && !formData.file)) {
      alert(
        "Please fill out the job title and either job description or upload a file."
      );
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Job Description Data Submitted: ", formData);
      // Store data in localStorage and navigate to resume generation page
      saveToLocalStorage(formData);
      navigate("/resume-creator"); // Navigate to ResumeCreator page
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <textarea
                name="jobDescription"
                placeholder="Enter job description..."
                value={formData.jobDescription}
                onChange={handleChange}
                rows="5"
                className={styles.textarea}
              ></textarea>
            </div>
            <div className={styles.row}>
              <label htmlFor="fileUpload" className={styles.fileUploadLabel}>
                Upload Job Description (optional)
              </label>
              <input
                type="file"
                name="file"
                id="fileUpload"
                onChange={handleChange}
                className={styles.fileInput}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionUpload;
