// src/services/authService.js
import axios from "axios";

// Register user
export const register = async (formData) => {
  const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    return response; // Return the response from the API
  } catch (error) {
    console.error("Login Error:", error);
    throw error; // Throw the error to be handled in the component
  }
};
