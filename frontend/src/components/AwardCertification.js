import React, { useState } from "react";
import "../styles/AwardCertification.css"; // Import the CSS file

const AwardCertification = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    organizationName: "",
    awardTitle: "",
    acquisitionDate: "",
    description: "",
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
    console.log("Award/Certification Data Submitted: ", formData);
    // Optionally, submit the form data to the backend
    navigateToNext(); // Go to next form (if you have more)
  };

  return (
    <div className="container">
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="text"
                name="organizationName"
                placeholder="Organization's name"
                value={formData.organizationName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="awardTitle"
                placeholder="Award Title (optional)"
                value={formData.awardTitle}
                onChange={handleChange}
                className="input"
              />
              <input
                type="text"
                name="acquisitionDate"
                placeholder="MM/YY"
                value={formData.acquisitionDate}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="row">
              <textarea
                name="description"
                placeholder="Describe the award or certification..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="textarea"
              ></textarea>
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

export default AwardCertification;
