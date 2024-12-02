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
  const [educations, setEducations] = useState([
    {
      courseName: "",
      collegeOrSchoolName: "",
      startingYear: "",
      endingYear: "",
      percentageOrCGPA: "",
      currentlyStudying: false,
    },
  ]);

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.educations) {
      setEducations(savedData.educations);
    }
  }, []);

  const saveToLocalStorage = debounce((updatedEducations) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.educations = updatedEducations;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyStudying" && {
        endingYear: checked ? "" : updatedEducations[index].endingYear,
      }),
    };
    setEducations(updatedEducations);
    saveToLocalStorage(updatedEducations);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        courseName: "",
        collegeOrSchoolName: "",
        startingYear: "",
        endingYear: "",
        percentageOrCGPA: "",
        currentlyStudying: false,
      },
    ]);
  };

  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
    saveToLocalStorage(updatedEducations);
  };

  const validate = () => {
    const newErrors = educations.map((education) => {
      const errors = {};
      if (!education.courseName) errors.courseName = "Course name is required.";
      if (!education.collegeOrSchoolName)
        errors.collegeOrSchoolName = "College/School name is required.";
      if (!education.startingYear)
        errors.startingYear = "Starting year is required.";
      if (
        !education.currentlyStudying &&
        (!education.endingYear || isNaN(education.endingYear))
      )
        errors.endingYear = "Valid ending year is required.";
      if (!education.percentageOrCGPA)
        errors.percentageOrCGPA = "Percentage/CGPA is required.";
      return errors;
    });

    setErrors(newErrors);
    return newErrors.every((error) => Object.keys(error).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Education Form Submitted: ", educations);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {educations.map((education, index) => (
              <div key={index} className={styles.educationContainer}>
                <div className={styles.row}>
                  <input
                    type="text"
                    name="courseName"
                    placeholder="Course Name"
                    value={education.courseName}
                    onChange={(e) => handleChange(index, e)}
                    className={styles.input}
                  />
                  {errors[index]?.courseName && (
                    <span className={styles.error}>
                      {errors[index].courseName}
                    </span>
                  )}
                  <input
                    type="text"
                    name="percentageOrCGPA"
                    placeholder="Percentage/CGPA"
                    value={education.percentageOrCGPA}
                    onChange={(e) => handleChange(index, e)}
                    className={styles.input}
                  />
                  {errors[index]?.percentageOrCGPA && (
                    <span className={styles.error}>
                      {errors[index].percentageOrCGPA}
                    </span>
                  )}
                </div>

                <div className={styles.row}>
                  <input
                    type="text"
                    name="startingYear"
                    placeholder="Starting Year (e.g. 2020)"
                    value={education.startingYear}
                    onChange={(e) => handleChange(index, e)}
                    className={styles.input}
                  />
                  {errors[index]?.startingYear && (
                    <span className={styles.error}>
                      {errors[index].startingYear}
                    </span>
                  )}
                  <input
                    type="text"
                    name="endingYear"
                    placeholder="Ending Year (e.g. 2024)"
                    value={education.endingYear}
                    onChange={(e) => handleChange(index, e)}
                    className={styles.input}
                    disabled={education.currentlyStudying}
                  />
                  {errors[index]?.endingYear && (
                    <span className={styles.error}>
                      {errors[index].endingYear}
                    </span>
                  )}
                </div>

                <div className={styles.row}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="currentlyStudying"
                      checked={education.currentlyStudying}
                      onChange={(e) => handleChange(index, e)}
                      className={styles.checkbox}
                    />
                    Currently studying here
                  </label>
                </div>
                <div className={styles.row}>
                  <input
                    type="text"
                    name="collegeOrSchoolName"
                    placeholder="College/School Name"
                    value={education.collegeOrSchoolName}
                    onChange={(e) => handleChange(index, e)}
                    className={styles.input}
                  />
                  {errors[index]?.collegeOrSchoolName && (
                    <span className={styles.error}>
                      {errors[index].collegeOrSchoolName}
                    </span>
                  )}
                </div>

                {educations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className={styles.addButton}
            >
              + Add More Education
            </button>

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
