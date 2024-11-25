import React, { useState } from "react";
import styles from "./Skills.module.css";

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

  const handleSkillChange = (section, skill) => {
    setSelectedSkills((prevState) => {
      const updatedSectionSkills = prevState[section].includes(skill)
        ? prevState[section].filter((s) => s !== skill) // Remove if already selected
        : [...prevState[section], skill]; // Add if not selected

      return {
        ...prevState,
        [section]: updatedSectionSkills,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Skills Form Submitted: ", selectedSkills);
    navigateToNext();
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
