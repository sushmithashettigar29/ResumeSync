import React, { useState, useEffect } from "react";
import styles from "./Courses.module.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Courses = ({ navigateToNext }) => {
  const [courses, setCourses] = useState([
    { courseTitle: "", duration: "", offeredBy: "", completionYear: "" },
  ]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.courses) {
      setCourses(savedData.courses);
    }
  }, []);

  const saveToLocalStorage = debounce((updatedCourses) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.courses = updatedCourses;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
    saveToLocalStorage(updatedCourses);
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { courseTitle: "", duration: "", offeredBy: "", completionYear: "" },
    ]);
  };

  const removeCourse = (index) => {
    const updatedCourses = courses.filter((_, idx) => idx !== index);
    setCourses(updatedCourses);
    saveToLocalStorage(updatedCourses);
  };
  
  const validate = () => {
    for (const course of courses) {
      const { courseTitle, duration, offeredBy, completionYear } = course;
      if (!courseTitle || !duration || !offeredBy || !completionYear) {
        alert("All fields are required for each course.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Courses Form Submitted: ", courses);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Courses Information</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {courses.map((course, index) => (
            <div key={index} className={styles.courseContainer}>
              <h3>Course {index + 1}</h3>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Course Title"
                  value={course.courseTitle}
                  onChange={(e) =>
                    handleChange(index, "courseTitle", e.target.value)
                  }
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={course.duration}
                  onChange={(e) =>
                    handleChange(index, "duration", e.target.value)
                  }
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="Offered By"
                  value={course.offeredBy}
                  onChange={(e) =>
                    handleChange(index, "offeredBy", e.target.value)
                  }
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Completion Year"
                  value={course.completionYear}
                  onChange={(e) =>
                    handleChange(index, "completionYear", e.target.value)
                  }
                  required
                  className={styles.input}
                />
              </div>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeCourse(index)}
              >
                Remove
              </button>
              {index !== courses.length - 1 && <hr />}
            </div>
          ))}

          <button
            type="button"
            className={styles.addButton}
            onClick={addCourse}
          >
            + Add More Course
          </button>

          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Courses;
