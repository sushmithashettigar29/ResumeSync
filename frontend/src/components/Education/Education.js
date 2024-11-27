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

  const [errors, setErrors] = useState({});

  // Debounced save function for education data
  const saveToLocalStorage = debounce((updatedData) => {
    const existingData = JSON.parse(localStorage.getItem("resumeData")) || {};
    const updatedResumeData = {
      ...existingData,
      education: updatedData,
    };
    localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
  }, 300);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData && savedData.education) {
      setFormData(savedData.education);
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyStudying" && {
        endingYear: checked ? "" : formData.endingYear,
      }),
    };

    setFormData(updatedFormData);
    saveToLocalStorage(updatedFormData); // Debounced save
  };

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!formData.courseName) newErrors.courseName = "Course name is required.";
    if (!formData.collegeOrSchoolName)
      newErrors.collegeOrSchoolName = "College/School name is required.";
    if (!formData.startingYear)
      newErrors.startingYear = "Starting year is required.";
    if (
      !formData.currentlyStudying &&
      (!formData.endingYear || isNaN(formData.endingYear))
    )
      newErrors.endingYear = "Ending year is required.";
    if (!formData.percentageOrCGPA)
      newErrors.percentageOrCGPA = "Percentage/CGPA is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     const existingData = JSON.parse(localStorage.getItem("resumeData")) || {};
  //     const updatedResumeData = {
  //       ...existingData,
  //       education: formData,
  //     };
  //     localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
  //     console.log("Updated resumeData saved to localStorage:", updatedResumeData);
  //     navigateToNext();
  //   }
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedResumeData = {
        ...(JSON.parse(localStorage.getItem("resumeData")) || {}),
        education: {
          courseName: formData.courseName || "N/A",
          collegeOrSchoolName: formData.collegeOrSchoolName || "N/A",
          startingYear: formData.startingYear || "N/A",
          endingYear: formData.currentlyStudying
            ? "Present"
            : formData.endingYear || "N/A",
          percentageOrCGPA: formData.percentageOrCGPA || "N/A",
        },
      };
      localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
      console.log("Saved education data:", updatedResumeData);
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
                className={styles.input}
              />
              {errors.courseName && (
                <span className={styles.error}>{errors.courseName}</span>
              )}
              <input
                type="text"
                name="collegeOrSchoolName"
                placeholder="College/School Name"
                value={formData.collegeOrSchoolName}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.collegeOrSchoolName && (
                <span className={styles.error}>
                  {errors.collegeOrSchoolName}
                </span>
              )}
            </div>

            <div className={styles.row}>
              <input
                type="text"
                name="startingYear"
                placeholder="Starting Year (e.g. 2020)"
                value={formData.startingYear}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.startingYear && (
                <span className={styles.error}>{errors.startingYear}</span>
              )}
              <input
                type="text"
                name="endingYear"
                placeholder="Ending Year (e.g. 2024)"
                value={formData.endingYear}
                onChange={handleChange}
                className={styles.input}
                disabled={formData.currentlyStudying}
              />
              {errors.endingYear && (
                <span className={styles.error}>{errors.endingYear}</span>
              )}
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

            <div className={styles.row}>
              <input
                type="text"
                name="percentageOrCGPA"
                placeholder="Percentage/CGPA"
                value={formData.percentageOrCGPA}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.percentageOrCGPA && (
                <span className={styles.error}>{errors.percentageOrCGPA}</span>
              )}
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
