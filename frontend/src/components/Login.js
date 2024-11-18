// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

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
      alert("Login successful");
      console.log("Token:", response.data.token);
      navigate("/home"); // Navigate to HomePage only after successful login
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
          <Typography
            variant="body2"
            sx={{ marginTop: 2, textAlign: "center", cursor: "pointer" }}
            onClick={() => navigate("/register")} // Redirect to Register when clicked
          >
            Don't have an Account? <u>Register</u>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
