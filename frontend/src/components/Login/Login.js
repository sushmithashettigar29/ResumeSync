import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password);
      localStorage.setItem("username", response.data.user.name);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("bio", response.data.user.bio || ""); 
      localStorage.setItem("profilePhoto", response.data.user.profilePhoto || ""); 
      localStorage.setItem("token", response.data.token);
  
      alert("Login successful");
      navigate("/home");
    } catch (error) {
      alert("Login failed");
    }
  };
  
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2 className={styles.welcome}>Welcome Back to ResumeSync!</h2>
        <h2 className={styles.loginTitle}>Login Now</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Enter email"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Enter password"
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <p
          className={styles.registerRedirect}
          onClick={() => navigate("/register")}
        >
          Don't have an Account? <u>Register</u>
        </p>
      </div>
    </div>
  );
};

export default Login;
