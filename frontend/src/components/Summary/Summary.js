import React, { useState } from "react";
import styles from "./Summary.module.css";

const Summary = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    summary: "",
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
    console.log("Form Data Submitted: ", formData);
    navigateToNext();
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <input
                type="text"
                name="summary"
                placeholder="Write short summary about yourself"
                value={formData.summary}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles["next-button"]}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Summary;
