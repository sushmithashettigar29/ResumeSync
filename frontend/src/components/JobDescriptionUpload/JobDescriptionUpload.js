import React, { useState } from "react";
import styles from "./JobDescriptionUpload.module.css"; // Import scoped CSS

const JobDescriptionUpload = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        file: files[0], // Store the selected file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.jobTitle || (!formData.jobDescription && !formData.file)) {
      alert(
        "Please fill out the job title and either job description or upload a file."
      );
      return;
    }

    console.log("Job Description Data Submitted: ", formData);
    navigateToNext(); // Navigate to the next section
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
