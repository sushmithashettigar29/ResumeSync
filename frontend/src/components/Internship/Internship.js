import React, { useState } from "react";
import styles from "./Internship.module.css";

const Internship = ({ navigateToNext }) => {
  const [internships, setInternships] = useState([
    { role: "", startMonth: "", endMonth: "", description: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedInternships = [...internships];
    updatedInternships[index][field] = value;
    setInternships(updatedInternships);
  };

  const addInternship = () => {
    setInternships([
      ...internships,
      { role: "", startMonth: "", endMonth: "", description: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Internships Form Submitted: ", internships);
    navigateToNext();
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
