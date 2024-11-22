import React, { useState } from "react";
// import "../styles/JobDescriptionUpload.css"; // Import the CSS file

const JobDescriptionUpload = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        file: files[0], // Store the selected file
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.jobTitle || (!formData.jobDescription && !formData.file)) {
      alert(
        "Please fill out the job title and either job description or upload a file."
      );
      return;
    }

    console.log("Job Description Data Submitted: ", formData);
    navigateToNext(); // Navigate to the next section
  };

  return (
    <div className="container">
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="text"
                name="jobTitle"
                placeholder="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <textarea
                name="jobDescription"
                placeholder="Enter job description..."
                value={formData.jobDescription}
                onChange={handleChange}
                rows="5"
                className="textarea"
              ></textarea>
            </div>
            <div className="row">
              <label htmlFor="fileUpload" className="file-upload-label">
                Upload Job Description (optional)
              </label>
              <input
                type="file"
                name="file"
                id="fileUpload"
                onChange={handleChange}
                className="file-input"
              />
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

export default JobDescriptionUpload;
