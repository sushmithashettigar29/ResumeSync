import React, { useState } from "react";
import styles from "./Project.module.css";

const Project = ({ navigateToNext }) => {
  const [projects, setProjects] = useState([
    { title: "", startMonth: "", endMonth: "", description: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", startMonth: "", endMonth: "", description: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Projects Form Submitted: ", projects);
    navigateToNext();
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
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Start Month (e.g. January 2022)"
                      value={project.startMonth}
                      onChange={(e) =>
                        handleChange(index, "startMonth", e.target.value)
                      }
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="End Month (e.g. December 2022)"
                      value={project.endMonth}
                      onChange={(e) =>
                        handleChange(index, "endMonth", e.target.value)
                      }
                      required
                      className={styles.input}
                    />
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
