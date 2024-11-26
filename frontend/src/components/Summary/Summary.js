import React, { useState, useEffect } from "react";
import styles from "./Summary.module.css";

// Debounce function to optimize localStorage updates
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Summary = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    summary: "",
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("summaryData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Debounced save function for summary data
  const saveToLocalStorage = debounce((updatedData) => {
    localStorage.setItem("summaryData", JSON.stringify(updatedData));
  }, 300);

  // Handle input changes for summary
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const updatedForm = { ...prevState, [name]: value };
      saveToLocalStorage(updatedForm); // Debounced save
      return updatedForm;
    });
  };

  // Simple validation for summary
  const validate = () => {
    if (!formData.summary.trim()) {
      alert("Summary cannot be empty.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted: ", formData);
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
                placeholder="Write short summary about yourself"
                value={formData.summary}
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
