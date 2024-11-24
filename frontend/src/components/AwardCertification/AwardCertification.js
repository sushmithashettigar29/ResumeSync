import React, { useState } from "react";
import styles from "./AwardCertification.module.css"; // Scoped CSS

const AwardCertification = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    organizationName: "",
    awardTitle: "",
    acquisitionDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Award/Certification Data Submitted: ", formData);
    navigateToNext(); // Navigate to the next form (if needed)
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="organizationName"
                placeholder="Organization's name"
                value={formData.organizationName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="text"
                name="awardTitle"
                placeholder="Award Title (optional)"
                value={formData.awardTitle}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="text"
                name="acquisitionDate"
                placeholder="MM/YY"
                value={formData.acquisitionDate}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <textarea
                name="description"
                placeholder="Describe the award or certification..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className={styles.textarea}
              ></textarea>
            </div>
            <button type="submit" className={styles["finish-button"]}>
              Next Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AwardCertification;
