import React, { useState, useEffect } from "react";
import styles from "./PersonalInformation.module.css";

const PersonalInformation = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: "",
    email: "",
    linkedIn: "",
    gitHub: "",
    Portfolio: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData && savedData.personalInformation) {
      setFormData(savedData.personalInformation);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const existingData = JSON.parse(localStorage.getItem("resumeData")) || {};
    const updatedResumeData = {
      ...existingData,
      personalInformation: updatedData,
    };
    localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedData = { ...formData, profileImage: reader.result }; 
        setFormData(updatedData);

        const existingData = JSON.parse(localStorage.getItem("resumeData")) || {};
        const updatedResumeData = {
          ...existingData,
          personalInformation: updatedData,
        };
        localStorage.setItem("resumeData", JSON.stringify(updatedResumeData));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required.";
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10)
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    if (!formData.linkedIn || !formData.linkedIn.startsWith("http"))
      newErrors.linkedIn = "Valid linkedIn URL is required.";
    if (formData.gitHub && !formData.gitHub.startsWith("http"))
      newErrors.gitHub = "gitHub URL must start with http.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const existingData = JSON.parse(localStorage.getItem("resumeData")) || {};

      const updatedData = {
        ...existingData,
        personalInformation: formData,
      };

      localStorage.setItem("resumeData", JSON.stringify(updatedData));
      console.log("Updated resumeData saved to localStorage:", updatedData);
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
                {errors.firstName && (
                  <span className={styles.error}>{errors.firstName}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
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
                {errors.lastName && (
                  <span className={styles.error}>{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                
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
                {errors.mobileNumber && (
                  <span className={styles.error}>{errors.mobileNumber}</span>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                
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
                {errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                
                <input
                  type="text"
                  name="linkedIn"
                  id="linkedIn"
                  placeholder="LinkedIn Profile Link"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
                {errors.linkedIn && (
                  <span className={styles.error}>{errors.linkedIn}</span>
                )}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                
                <input
                  type="text"
                  name="gitHub"
                  id="gitHub"
                  placeholder="GitHub Profile Link"
                  value={formData.gitHub}
                  onChange={handleChange}
                  className={styles.input}
                />
                {errors.gitHub && (
                  <span className={styles.error}>{errors.gitHub}</span>
                )}
              </div>
              <div className={styles.inputGroup}>
                
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
            <div className={styles.inputGroup}>
              <label htmlFor="profileImage">Upload Profile Image</label>
              <br />
              <input
                type="file"
                name="profileImage"
                id="profileImage"
                accept="image/*"
                onChange={handleImageUpload}
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

export default PersonalInformation;
