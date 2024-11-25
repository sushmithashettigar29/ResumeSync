import React, { useState, useEffect } from "react";
import styles from "./Hobbies.module.css";

const Hobbies = ({ navigateToNext }) => {
  // Single state object to manage form data
  const [formData, setFormData] = useState({
    hobbies: [""], // Initialize hobbies as an array
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Handle changes in hobbies
  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...formData.hobbies];
    updatedHobbies[index] = value;

    setFormData((prev) => ({
      ...prev,
      hobbies: updatedHobbies,
    }));
  };

  // Add a new hobby input
  const addHobby = () => {
    setFormData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    // Clear all data from localStorage
    localStorage.clear();

    // Navigate to the next page
    navigateToNext();
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <ul className={styles.hobbiesList}>
              {formData.hobbies.map((hobby, index) => (
                <li key={index} className={styles.hobbyItem}>
                  <input
                    type="text"
                    placeholder={`Hobby ${index + 1}`}
                    value={hobby}
                    onChange={(e) => handleHobbyChange(index, e.target.value)}
                    className={styles.input}
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.addButton}
              onClick={addHobby}
            >
              + Add More Hobby
            </button>

            <button type="submit" className={styles.submitButton}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
