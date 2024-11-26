import React, { useState, useEffect } from "react";
import styles from "./Education.module.css";

// Debounce function to optimize localStorage updates
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Education = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    courseName: "",
    collegeOrSchoolName: "",
    startingYear: "",
    endingYear: "",
    percentageOrCGPA: "",
    currentlyStudying: false,
  });

  // Debounced save function for education data
  const saveToLocalStorage = debounce((updatedData) => {
    localStorage.setItem("educationData", JSON.stringify(updatedData));
  }, 300);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => {
      const updatedState = {
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
        ...(name === "currentlyStudying" && {
          endingYear: checked ? "" : prevState.endingYear,
        }),
      };
      saveToLocalStorage(updatedState); // Debounced save
      return updatedState;
    });
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("educationData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Simple validation to check required fields
  const validate = () => {
    if (!formData.startingYear || !formData.endingYear || !formData.percentageOrCGPA) {
      alert("All fields are required.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Education Form Submitted: ", formData);
      navigateToNext();
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
                name="courseName"
                placeholder="Course Name"
                value={formData.courseName}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="collegeOrSchoolName"
                placeholder="College/School Name"
                value={formData.collegeOrSchoolName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.row}>
              <input
                type="text"
                name="percentageOrCGPA"
                placeholder="Percentage/CGPA"
                value={formData.percentageOrCGPA}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.row}>
              <input
                type="text"
                name="startingYear"
                placeholder="Starting Year (e.g. 2020)"
                value={formData.startingYear}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="endingYear"
                placeholder="Ending Year (e.g. 2024)"
                value={formData.endingYear}
                onChange={handleChange}
                className={styles.input}
                disabled={formData.currentlyStudying}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                Currently studying here
              </label>
            </div>

            <button type="submit" className={styles.nextButton}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Education;
