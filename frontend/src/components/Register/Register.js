import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"; // Import the CSS Module

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Registration successful");
      navigate("/home");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-box"]}>
        <h1 className={styles["register-title"]}>Register</h1>
        <form onSubmit={handleSubmit} className={styles["register-form"]}>
          <div className={styles["form-field"]}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles["register-button"]}>
            Register
          </button>
        </form>
        <p className={styles["redirect-text"]}>
          Already have an Account?{" "}
          <span
            className={styles["redirect-link"]}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
