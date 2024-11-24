import React, { useState } from "react";
import styles from "./PersonalInformation.module.css"; // Import the CSS Module

const PersonalInformation = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="text"
                name="profession"
                placeholder="e.g. Software Engineer"
                value={formData.profession}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
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
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles["next-button"]}>
              Next Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
