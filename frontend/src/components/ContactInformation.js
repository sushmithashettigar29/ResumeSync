import React, { useState } from "react";
import "../styles/ContactInformation.css"; // Import the CSS file

const ContactInformation = ({ navigateToNext }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    github: "",
    portfolio: "",
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
    console.log("Contact Information Submitted: ", formData);
    navigateToNext(); // Go to next form
  };

  return (
    <div className="container">
      <div className="content">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />
              <div className="phone-input">
                <span className="flag">🇬🇧</span>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </div>
            </div>
            <div className="row">
              <input
                type="url"
                name="linkedin"
                placeholder="LinkedIn Profile link"
                value={formData.linkedin}
                onChange={handleChange}
                className="input"
              />
              <input
                type="url"
                name="twitter"
                placeholder="Twitter Profile link"
                value={formData.twitter}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="url"
                name="instagram"
                placeholder="Instagram Profile link"
                value={formData.instagram}
                onChange={handleChange}
                className="input"
              />
              <input
                type="url"
                name="portfolio"
                placeholder="Portfolio link"
                value={formData.portfolio}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="url"
                name="github"
                placeholder="GitHub profile link"
                value={formData.github}
                onChange={handleChange}
                className="input"
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

export default ContactInformation;
