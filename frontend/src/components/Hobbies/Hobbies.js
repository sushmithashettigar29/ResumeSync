import React, { useState, useEffect } from "react";
import styles from "./Hobbies.module.css";

// Debounce function to optimize localStorage updates
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const Hobbies = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    hobbies: [""],
  });

  // Load saved hobbies data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("hobbiesData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Debounced save function for hobbies data
  const saveToLocalStorage = debounce((updatedData) => {
    localStorage.setItem("hobbiesData", JSON.stringify(updatedData));
  }, 300);

  // Handle hobby input changes for a specific index
  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...formData.hobbies];
    updatedHobbies[index] = value;

    setFormData((prev) => {
      const updatedForm = { ...prev, hobbies: updatedHobbies };
      saveToLocalStorage(updatedForm); // Debounced save
      return updatedForm;
    });
  };

  // Add a new empty hobby input
  const addHobby = () => {
    setFormData((prev) => {
      const updatedForm = { ...prev, hobbies: [...prev.hobbies, ""] };
      saveToLocalStorage(updatedForm); // Debounced save
      return updatedForm;
    });
  };

  // Simple validation for hobby fields
  const validate = () => {
    const hobbiesFilled = formData.hobbies.filter((hobby) => hobby.trim() !== "");
    if (hobbiesFilled.length === 0) {
      alert("Please add at least one hobby.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Hobbies Submitted: ", formData);
      // Optionally, clear localStorage on submit if needed
      // localStorage.clear();
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
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
  );
};

export default Hobbies;
