import React, { useState, useEffect } from "react";
import styles from "./ActivitiesParticipation.module.css";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const ActivitiesParticipation = ({ navigateToNext }) => {
  const [activities, setActivities] = useState([
    { eventName: "", role: "", duration: "", description: "" },
  ]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("resumeData"));
    if (savedData?.activities) {
      setActivities(savedData.activities);
    }
  }, []);

  const saveToLocalStorage = debounce((updatedActivities) => {
    const resumeData = JSON.parse(localStorage.getItem("resumeData")) || {};
    resumeData.activities = updatedActivities;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, 300);

  const handleChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index][field] = value;
    setActivities(updatedActivities);
    saveToLocalStorage(updatedActivities);
  };

  const addActivity = () => {
    setActivities([
      ...activities,
      { eventName: "", role: "", duration: "", description: "" },
    ]);
  };

  //remove activities need to be done if possible

  const validate = () => {
    for (let i = 0; i < activities.length; i++) {
      const { eventName, role, duration, description } = activities[i];
      if (!eventName || !role || !duration || !description) {
        alert("All fields are required for each activity.");
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Activities Form Submitted: ", activities);
      navigateToNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <ul className={styles.activityList}>
              {activities.map((activity, index) => (
                <li key={index} className={styles.activityItem}>
                  <h3>Activity {index + 1}</h3>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Event Name"
                      value={activity.eventName}
                      onChange={(e) =>
                        handleChange(index, "eventName", e.target.value)
                      }
                      required
                      className={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={activity.role}
                      onChange={(e) =>
                        handleChange(index, "role", e.target.value)
                      }
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      placeholder="Duration"
                      value={activity.duration}
                      onChange={(e) =>
                        handleChange(index, "duration", e.target.value)
                      }
                      required
                      className={styles.input}
                    />
                    <textarea
                      placeholder="Description"
                      value={activity.description}
                      onChange={(e) =>
                        handleChange(index, "description", e.target.value)
                      }
                      required
                      className={styles.textarea}
                    />
                  </div>
                  {/* Add line break or margin between activities */}
                  <hr />
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles.addButton}
              onClick={addActivity}
            >
              + Add More Activity
            </button>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesParticipation;
