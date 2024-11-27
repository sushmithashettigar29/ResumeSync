import React, { useState, useEffect } from "react";
import styles from "./Internship.module.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Internship = ({ navigateToNext }) => {
  const [internships, setInternships] = useState([
    { role: "", startMonth: "", endMonth: "", description: "" },
  ]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.internships) {
      setInternships(savedData.internships);
    }
  }, []);

  const saveToLocalStorage = debounce((updatedInternships) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.internships = updatedInternships;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  const handleChange = (index, field, value) => {
    const updatedInternships = [...internships];
    updatedInternships[index][field] = value;
    setInternships(updatedInternships);
    saveToLocalStorage(updatedInternships);
  };

  const addInternship = () => {
    setInternships([
      ...internships,
      { role: "", startMonth: "", endMonth: "", description: "" },
    ]);
  };

  //remove internship need to be done if possible 

  const validate = () => {
    for (let i = 0; i < internships.length; i++) {
      const { role, startMonth, endMonth, description } = internships[i];
      if (!role || !startMonth || !endMonth || !description) {
        alert("All fields are required for each internship.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Internships Form Submitted: ", internships);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {internships.map((internship, index) => (
              <div key={index} className={styles.internshipContainer}>
                <h3>Internship {index + 1}</h3>
                <div className={styles.row}>
                  <input
                    type="text"
                    placeholder="Role"
                    value={internships.role}
                    onChange={(e) =>
                      handleChange(index, "role", e.target.value)
                    }
                    required
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Start Month (e.g., Jan 2023)"
                    value={internships.startMonth}
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
                    placeholder="End Month (e.g., Dec 2023)"
                    value={internships.endMonth}
                    onChange={(e) =>
                      handleChange(index, "endMonth", e.target.value)
                    }
                    required
                    className={styles.input}
                  />
                  <textarea
                    placeholder="Description"
                    value={internships.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    required
                    className={styles.textarea}
                  />
                </div>
                {index !== internships.length - 1 && <hr />}
              </div>
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={addInternship}
            >
              + Add More Internship
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

export default Internship;
