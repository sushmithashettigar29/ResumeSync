import React, { useState, useEffect } from "react";
import styles from "./Project.module.css";

// Debounce function to optimize localStorage updates
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

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("projects");
    if (savedData) {
      setProjects(JSON.parse(savedData));
    }
  }, []);

  // Debounced save function for projects
  const saveToLocalStorage = debounce((updatedProjects) => {
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }, 300);

  // Handle input changes for projects
  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
    saveToLocalStorage(updatedProjects);
  };

  // Add a new project
  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", startMonth: "", endMonth: "", description: "" },
    ]);
  };

  // Simple validation for project fields
  const validate = () => {
    for (let i = 0; i < projects.length; i++) {
      const { title, startMonth, endMonth, description } = projects[i];
      if (!title || !startMonth || !endMonth || !description) {
        alert("All fields are required for each project.");
        return false;
      }
      // Validate month-year format (e.g., January 2022)
      const monthYearPattern = /^[a-zA-Z]+ \d{4}$/;
      if (!monthYearPattern.test(startMonth) || !monthYearPattern.test(endMonth)) {
        alert("Please enter valid month-year format (e.g., January 2022).");
        return false;
      }
    }
    return true;
  };

  // Handle form submission
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
                      onChange={(e) => handleChange(index, "title", e.target.value)}
                      required
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Start Month (e.g. January 2022)"
                      value={project.startMonth}
                      onChange={(e) => handleChange(index, "startMonth", e.target.value)}
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="End Month (e.g. December 2022)"
                      value={project.endMonth}
                      onChange={(e) => handleChange(index, "endMonth", e.target.value)}
                      required
                      className={styles.input}
                    />
                    <textarea
                      placeholder="Description"
                      value={project.description}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                      required
                      className={styles.textarea}
                    />
                  </div>
                  <hr />
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
