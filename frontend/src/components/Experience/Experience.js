import React, { useState } from "react";
import styles from "./Experience.module.css";

const Experience = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    employer: "",
    company: "",
    address: "",
    role: "",
    start: "",
    finish: "",
    currentlyWorking: false,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "currentlyWorking" && {
        finish: checked ? "" : prevState.finish,
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.start.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("Invalid start date format. Please use MM/YY.");
      return;
    }
    if (
      !formData.currentlyWorking &&
      !formData.finish.match(/^(0[1-9]|1[0-2])\/\d{2}$/)
    ) {
      alert("Invalid finish date format. Please use MM/YY.");
      return;
    }

    console.log("Experience Data Submitted: ", formData);
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
                name="employer"
                placeholder="Employer's name"
                value={formData.employer}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={formData.role}
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
                disabled={formData.currentlyWorking}
              />
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                Currently work here
              </label>
            </div>
            <button type="submit" className={styles.nextButton}>
              Next Section
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Experience;
