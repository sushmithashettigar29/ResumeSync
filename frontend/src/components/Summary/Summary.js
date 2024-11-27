import React, { useState, useEffect } from "react";
import styles from "./Summary.module.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Summary = ({ navigateToNext }) => {
  const [summary, setSummary] = useState("");

  // Load saved summary from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.summary) {
      setSummary(savedData.summary);
    }
  }, []);

  // Save updated summary to localStorage
  const saveToLocalStorage = debounce((updatedSummary) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.summary = updatedSummary;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  // Handle input changes
  const handleChange = (e) => {
    const { value } = e.target;
    setSummary(value);
    saveToLocalStorage(value);
  };

  // Validate the summary
  const validate = () => {
    if (!summary.trim()) {
      alert("Summary cannot be empty.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Summary Form Submitted: ", summary);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="summary"
                placeholder="Write a short summary about yourself"
                value={summary}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles["next-button"]}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Summary;
