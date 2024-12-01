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
  const [hobbies, setHobbies] = useState([""]);

  // Load hobbies data from localStorage on component mount
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.hobbies) {
      setHobbies(savedData.hobbies);
    }
  }, []);

  // Save hobbies to localStorage (debounced)
  const saveToLocalStorage = debounce((updatedHobbies) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.hobbies = updatedHobbies;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  // Handle input changes for hobbies
  const handleHobbyChange = (index, value) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies[index] = value;
    setHobbies(updatedHobbies);
    saveToLocalStorage(updatedHobbies);
  };

  // Add a new empty hobby input
  const addHobby = () => {
    setHobbies((prevHobbies) => {
      const updatedHobbies = [...prevHobbies, ""];
      saveToLocalStorage(updatedHobbies);
      return updatedHobbies;
    });
  };

  // Remove a specific hobby
  const removeHobby = (index) => {
    const updatedHobbies = hobbies.filter((_, i) => i !== index);
    setHobbies(updatedHobbies);
    saveToLocalStorage(updatedHobbies);
  };

  // Validate hobbies input
  const validate = () => {
    const hobbiesFilled = hobbies
      .map((hobby) => hobby.trim())
      .filter((hobby) => hobby !== "");

    if (hobbiesFilled.length === 0) {
      alert("Please add at least one hobby.");
      return false;
    }

    if (new Set(hobbiesFilled).size !== hobbiesFilled.length) {
      alert("Duplicate hobbies are not allowed.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Hobbies Submitted: ", hobbies);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <ul className={styles.hobbiesList}>
            {hobbies.map((hobby, index) => (
              <li key={index} className={styles.hobbyItem}>
                <input
                  type="text"
                  placeholder={`Hobby ${index + 1}`}
                  value={hobby}
                  onChange={(e) => handleHobbyChange(index, e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removeHobby(index)}
                >
                  Remove
                </button>
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
