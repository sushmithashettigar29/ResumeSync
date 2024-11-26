import React, { useState, useEffect } from "react";
import styles from "./PersonalInformation.module.css";

const PersonalInformation = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    email: "",
    LinkedIn: "",
    GitHub: "",
    Portfolio: "",
  });

  const [errors, setErrors] = useState({});

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("personalInformation");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    // Save to localStorage
    localStorage.setItem("personalInformation", JSON.stringify(updatedData));
  };

  // Validate fields
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10)
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    if (!formData.LinkedIn || !formData.LinkedIn.startsWith("http"))
      newErrors.LinkedIn = "Valid LinkedIn URL is required.";
    if (formData.GitHub && !formData.GitHub.startsWith("http"))
      newErrors.GitHub = "GitHub URL must start with http.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted: ", formData);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["form-container"]}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Home Address in short"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="number"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                {errors.mobileNumber && <span className={styles.error}>{errors.mobileNumber}</span>}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                {errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="LinkedIn">LinkedIn Profile</label>
                <input
                  type="text"
                  name="LinkedIn"
                  id="LinkedIn"
                  placeholder="LinkedIn Profile Link"
                  value={formData.LinkedIn}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                {errors.LinkedIn && <span className={styles.error}>{errors.LinkedIn}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="GitHub">GitHub Profile</label>
                <input
                  type="text"
                  name="GitHub"
                  id="GitHub"
                  placeholder="GitHub Profile Link"
                  value={formData.GitHub}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.GitHub && <span className={styles.error}>{errors.GitHub}</span>}
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="Portfolio">Portfolio</label>
                <input
                  type="text"
                  name="Portfolio"
                  id="Portfolio"
                  placeholder="Portfolio Link"
                  value={formData.Portfolio}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
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

export default PersonalInformation;
