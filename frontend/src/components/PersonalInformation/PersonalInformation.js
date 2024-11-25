import React,  { useState, useEffect }  from "react";
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
                name="address"
                placeholder="Enter Home Address in short"
                value={formData.address}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="number"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.row}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="LinkedIn"
                placeholder="LinkedIn Profile Link"
                value={formData.LinkedIn}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="GitHub"
                placeholder="GitHub Profile Link"
                value={formData.GitHub}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                name="Portfolio"
                placeholder="Portfolio Link"
                value={formData.Portfolio}
                onChange={handleChange}
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
