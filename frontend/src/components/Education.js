import React, { useState } from "react";
import "../styles/Education.css";
import NavBar from "./NavBar";

const Education = () => {
  const [formData, setFormData] = useState({
    institution: "",
    course: "",
    country: "",
    state: "",
    start: "",
    finish: "",
    currentlyStudying: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <div className="sidebar">
          <button className="sidebar-button">Personal Information</button>
          <button className="sidebar-button active">Education</button>
          <button className="sidebar-button">Experience</button>
          <button className="sidebar-button">Contact Information</button>
          <button className="sidebar-button">Award/Certification</button>
        </div>
        <div className="form-container">
          <h2 className="form-title">Education</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="text"
                name="institution"
                placeholder="Name of school"
                value={formData.institution}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="course"
                placeholder="Course studied"
                value={formData.course}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="country"
                placeholder="Country name"
                value={formData.country}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row time-period">
              <input
                type="text"
                name="start"
                placeholder="MM/YY"
                value={formData.start}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="finish"
                placeholder="MM/YY"
                value={formData.finish}
                onChange={handleChange}
                className="input"
                disabled={formData.currentlyStudying}
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={handleChange}
                  className="checkbox"
                />
                Currently study here
              </label>
            </div>
            <button type="submit" className="next-button">
              Next Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Education;
