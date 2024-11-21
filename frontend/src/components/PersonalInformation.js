import React, { useState } from "react";
import "../styles/PersonalInformation.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
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
    console.log("Form Data Submitted: ", formData);
  };

  const navigateToEducation =() =>{
    navigate("/education");
  }

  return (
    <div className="container">
        <NavBar/>
      <div className="content">
        <div className="sidebar">
          <button className="sidebar-button active">
            Personal Information
          </button>
          <button className="sidebar-button">Education</button>
          <button className="sidebar-button">Experience</button>
          <button className="sidebar-button">Contact Information</button>
          <button className="sidebar-button">Award/Certification</button>
        </div>
        <div className="form-container">
          <h2 className="form-title">Personal Information</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Surname"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="profession"
                placeholder="e.g Software Engineer"
                value={formData.profession}
                onChange={handleChange}
                required
                className="input"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
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
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <button type="submit" className="next-button" onClick={navigateToEducation}>
              Next Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
