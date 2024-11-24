import React, { useState } from "react";
import styles from "./ContactInformation.module.css"; // Scoped CSS Module

const ContactInformation = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    github: "",
    portfolio: "",
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
    console.log("Contact Information Submitted: ", formData);
    navigateToNext(); // Navigate to the next form
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <div className={styles["phone-input"]}>
                <span className={styles.flag}>🇬🇧</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.row}>
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile link"
                value={formData.linkedin}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="url"
                name="twitter"
                placeholder="Twitter Profile link"
                value={formData.twitter}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="url"
                name="instagram"
                placeholder="Instagram Profile link"
                value={formData.instagram}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="url"
                name="portfolio"
                placeholder="Portfolio link"
                value={formData.portfolio}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="url"
                name="github"
                placeholder="GitHub profile link"
                value={formData.github}
                onChange={handleChange}
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

export default ContactInformation;
