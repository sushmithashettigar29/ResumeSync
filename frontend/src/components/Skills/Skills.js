import React, { useState, useEffect } from "react";
import styles from "./Skills.module.css";

// Debounce function to optimize localStorage updates
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Skills = ({ navigateToNext }) => {
  const [selectedSkills, setSelectedSkills] = useState({
    languages: [],
    frameworks: [],
    tools: [],
    databases: [],
    cloud: [],
    os: [],
    methodologies: [],
    networking: [],
    design: [],
    testing: [],
    analytics: [],
    softSkills: [],
    otherSkills: [],
  });

  const skillsData = {
    languages: ["Java", "C", "C++", "Python", "JavaScript", "TypeScript"],
    frameworks: ["ReactJS", "Angular", "VueJS", "Node.js", "Express.js"],
    tools: ["Git", "GitHub", "Docker", "Jenkins", "Postman", "Swagger"],
    databases: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Firebase"],
    cloud: ["AWS", "Google Cloud", "Azure", "Heroku"],
    os: ["Windows", "Linux", "macOS", "Ubuntu", "Android", "iOS"],
    methodologies: ["Agile", "Scrum", "Kanban", "DevOps", "TDD"],
    networking: ["TCP/IP", "HTTP", "HTTPS", "SSH", "REST APIs"],
    design: ["Figma", "Sketch", "Adobe XD", "Prototyping", "Wireframing"],
    testing: ["JUnit", "Mocha", "Jest", "Selenium", "Cypress"],
    analytics: ["Google Analytics", "Tableau", "Power BI", "Grafana"],
    softSkills: ["Communication", "Teamwork", "Leadership", "Problem Solving"],
    otherSkills: ["Machine Learning", "Blockchain", "IoT", "Game Development"],
  };

  // Debounced save function for skills data
  const saveToLocalStorage = debounce((updatedData) => {
    localStorage.setItem("skillsData", JSON.stringify(updatedData));
  }, 300);

  // Handle skill selection toggle
  const handleSkillChange = (section, skill) => {
    setSelectedSkills((prevState) => {
      const updatedSectionSkills = prevState[section].includes(skill)
        ? prevState[section].filter((s) => s !== skill) // Remove if already selected
        : [...prevState[section], skill]; // Add if not selected

      const updatedState = {
        ...prevState,
        [section]: updatedSectionSkills,
      };
      saveToLocalStorage(updatedState); // Debounced save
      return updatedState;
    });
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("skillsData");
    if (savedData) {
      setSelectedSkills(JSON.parse(savedData));
    }
  }, []);

  // Simple validation to ensure at least one skill is selected per section
  const validate = () => {
    for (let section in selectedSkills) {
      if (selectedSkills[section].length === 0) {
        alert(`Please select at least one skill from the ${section} section.`);
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Skills Form Submitted: ", selectedSkills);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {Object.keys(skillsData).map((section) => (
              <div key={section} className={styles.section}>
                <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
                <div className={styles.skillsList}>
                  {skillsData[section].map((skill) => (
                    <label key={skill} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedSkills[section].includes(skill)}
                        onChange={() => handleSkillChange(section, skill)}
                        className={styles.checkbox}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button type="submit" className={styles.submitButton}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Skills;
