import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./EnhanceResume.module.css";

function EnhanceResume() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [missingSkills, setMissingSkills] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setAtsScore(null);
    setMissingSkills([]);
    setError("");
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setMessage(data.message);
      setAtsScore(data.atsScore);
      setMissingSkills(data.missingSkills);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Enhance Your Resume</h1>
          <form onSubmit={handleUpload} className={styles.form}>
            <div className={styles.row}>
              <label htmlFor="resume" className={styles.label}>
                Upload Resume (.docx or .pdf):
              </label>
              <input
                type="file"
                name="resume"
                accept=".docx,.pdf"
                onChange={handleFileChange}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.row}>
              <textarea
                name="jobDescription"
                placeholder="Enter the job description..."
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                rows="5"
                className={styles.textarea}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            {message && <p className={styles.success}>{message}</p>}
            {atsScore !== null && <p>ATS Score: {atsScore}%</p>}
            {missingSkills.length > 0 && (
              <div>
                <h3>Missing Skills:</h3>
                <ul>
                  {missingSkills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default EnhanceResume;
