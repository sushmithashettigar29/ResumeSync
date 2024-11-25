import React, { useState } from "react";
import styles from "./Courses.module.css";

const Courses = ({ navigateToNext }) => {
  const [courses, setCourses] = useState([
    { courseTitle: "", duration: "", offeredBy: "", completionYear: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      { courseTitle: "", duration: "", offeredBy: "", completionYear: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Courses Form Submitted: ", courses);
    navigateToNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
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
                    placeholder="Duration of Course"
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
                    placeholder="Course Offered By"
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
                {/* Add line break or margin between courses */}
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
    </div>
  );
};

export default Courses;
