import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Project = ({ navigateToNext }) => {
  const [projects, setProjects] = useState([
    { title: "", startMonth: "", endMonth: "", description: "" },
  ]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.projects) {
      setProjects(savedData.projects);
    }
  }, []);

  const saveToLocalStorage = debounce((updatedProjects) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.projects = updatedProjects;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
    saveToLocalStorage(updatedProjects);
  };

  const addProject = () => {
    const lastProject = projects[projects.length - 1];
    if (
      !lastProject.title ||
      !lastProject.startMonth ||
      !lastProject.endMonth ||
      !lastProject.description
    ) {
      alert(
        "Please complete all fields in the current project before adding a new one."
      );
      return;
    }
    setProjects([
      ...projects,
      { title: "", startMonth: "", endMonth: "", description: "" },
    ]);
  };

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    saveToLocalStorage(updatedProjects);
  };

  const validate = () => {
    const monthYearPattern = /^[a-zA-Z]+ \d{4}$/;

    for (let i = 0; i < projects.length; i++) {
      const { title, startMonth, endMonth, description } = projects[i];
      if (!title || !startMonth || !endMonth || !description) {
        alert("All fields are required for each project.");
        return false;
      }
      if (
        !monthYearPattern.test(startMonth) ||
        !monthYearPattern.test(endMonth)
      ) {
        alert("Please enter a valid month-year format (e.g., January 2022).");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Projects Form Submitted: ", projects);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <ul className={styles.projectList}>
              {projects.map((project, index) => (
                <li key={index} className={styles.projectItem}>
                  <h3>Project {index + 1}</h3>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) =>
                        handleChange(index, "title", e.target.value)
                      }
                      required
                      className={`${styles.input} ${styles.inputfield}`}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Start Month (e.g., January 2022)"
                      value={project.startMonth}
                      onChange={(e) =>
                        handleChange(index, "startMonth", e.target.value)
                      }
                      required
                      className={`${styles.input} ${styles.inputfield}`}
                    />
                    <input
                      type="text"
                      placeholder="End Month (e.g., December 2022)"
                      value={project.endMonth}
                      onChange={(e) =>
                        handleChange(index, "endMonth", e.target.value)
                      }
                      required
                      className={`${styles.input} ${styles.inputfield}`}
                    />
                  </div>
                  <div className={styles.row}>
                    <textarea
                      placeholder="Description"
                      value={project.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      required
                      className={styles.textarea}
                    />
                  </div>
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => removeProject(index)}
                  >
                    Remove Project
                  </button>
                  {index !== projects.length - 1 && <hr />}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.addButton}
              onClick={addProject}
            >
              + Add More Project
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

export default Project;
