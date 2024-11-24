import React, { useState } from "react";
import styles from "./Education.module.css"; // Import CSS module

const Education = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    institution: "",
    course: "",
    country: "",
    state: "",
    start: "",
    finish: "",
    currentlyStudying: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyStudying" && {
        finish: checked ? "" : prevState.finish,
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.start.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("Invalid start date format. Please use MM/YY.");
      return;
    }
    if (
      !formData.currentlyStudying &&
      !formData.finish.match(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ) {
      alert("Invalid finish date format. Please use MM/YY.");
      return;
    }

    console.log("Education Form Submitted: ", formData);
    navigateToNext(); // Navigate to the next section
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="institution"
                placeholder="Name of school"
                value={formData.institution}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="course"
                placeholder="Course studied"
                value={formData.course}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="text"
                name="country"
                placeholder="Country name"
                value={formData.country}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={`${styles.row} ${styles.timePeriod}`}>
              <input
                type="text"
                name="start"
                placeholder="MM/YY"
                value={formData.start}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="finish"
                placeholder="MM/YY"
                value={formData.finish}
                onChange={handleChange}
                className={styles.input}
                disabled={formData.currentlyStudying}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                Currently study here
              </label>
            </div>
            <button type="submit" className={styles.nextButton}>
              Next Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Education;
