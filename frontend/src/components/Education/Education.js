import React, { useState, useEffect } from "react";
import styles from "./Education.module.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Education = ({ navigateToNext }) => {
  const [education, setEducation] = useState({
    courseName: "",
    collegeOrSchoolName: "",
    startingYear: "",
    endingYear: "",
    percentageOrCGPA: "",
    currentlyStudying: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.education) {
      setEducation(savedData.education);
    }
  }, []);

  const saveToLocalStorage = debounce((updatedEducation) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.education = updatedEducation;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedEducation = {
      ...education,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyStudying" && {
        endingYear: checked ? "" : education.endingYear,
      }),
    };
    setEducation(updatedEducation);
    saveToLocalStorage(updatedEducation);
  };

  const validate = () => {
    const newErrors = {};
    if (!education.courseName) newErrors.courseName = "Course name is required.";
    if (!education.collegeOrSchoolName)
      newErrors.collegeOrSchoolName = "College/School name is required.";
    if (!education.startingYear)
      newErrors.startingYear = "Starting year is required.";
    if (
      !education.currentlyStudying &&
      (!education.endingYear || isNaN(education.endingYear))
    )
      newErrors.endingYear = "Valid ending year is required.";
    if (!education.percentageOrCGPA)
      newErrors.percentageOrCGPA = "Percentage/CGPA is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Education Form Submitted: ", education);
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
                value={education.courseName}
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
                value={education.collegeOrSchoolName}
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
                value={education.startingYear}
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
                value={education.endingYear}
                onChange={handleChange}
                className={styles.input}
                disabled={education.currentlyStudying}
              />
              {errors.endingYear && (
                <span className={styles.error}>{errors.endingYear}</span>
              )}
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={education.currentlyStudying}
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
                value={education.percentageOrCGPA}
                onChange={handleChange}
                className={styles.input}
              />
              {errors.percentageOrCGPA && (
                <span className={styles.error}>
                  {errors.percentageOrCGPA}
                </span>
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
