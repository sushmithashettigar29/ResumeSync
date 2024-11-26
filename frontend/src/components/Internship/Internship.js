import React, { useState, useEffect } from "react";
import styles from "./Internship.module.css";

// Debounce function to optimize localStorage updates
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

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("internshipsData");
    if (savedData) {
      setInternships(JSON.parse(savedData));
    }
  }, []);

  // Debounced save function for internships data
  const saveToLocalStorage = debounce((updatedInternships) => {
    localStorage.setItem("internshipsData", JSON.stringify(updatedInternships));
  }, 300);

  // Handle input changes for internships
  const handleChange = (index, field, value) => {
    const updatedInternships = [...internships];
    updatedInternships[index][field] = value;
    setInternships(updatedInternships);
    saveToLocalStorage(updatedInternships);
  };

  // Add a new internship
  const addInternship = () => {
    setInternships([
      ...internships,
      { role: "", startMonth: "", endMonth: "", description: "" },
    ]);
  };

  // Simple validation for internship fields
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

  // Handle form submission
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
                    value={internship.role}
                    onChange={(e) =>
                      handleChange(index, "role", e.target.value)
                    }
                    required
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Start Month"
                    value={internship.startMonth}
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
                    placeholder="End Month"
                    value={internship.endMonth}
                    onChange={(e) =>
                      handleChange(index, "endMonth", e.target.value)
                    }
                    required
                    className={styles.input}
                  />
                  <textarea
                    placeholder="Description"
                    value={internship.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                    required
                    className={styles.textarea}
                  />
                </div>
                {/* Add line break or margin between internships */}
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
