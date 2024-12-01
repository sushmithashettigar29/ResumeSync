import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"; 
import { register } from "../../services/authService";

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
      const response = await register(formData);
      console.log("Server response:", response);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2 className={styles.welcome}>Welcome to Our ResumeSync!</h2>
        <h1 className={styles.registerTitle}>Register</h1>
        <form onSubmit={handleSubmit} className={styles.registerForm}>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          <button type="submit">Register</button>
        </form>
        <p
          className={styles.loginRedirect}
          onClick={() => navigate("/")}
        >
          Already have an Account? <u>Login</u>
        </p>
      </div>
    </div>
  );
};

export default Register;
