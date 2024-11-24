// routes/authRoutes.js
const express = require("express");
const { register, login, updateProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");  // Ensure protect middleware is imported

const router = express.Router();

// Register and Login routes
router.post("/register", register);
router.post("/login", login);

// Profile update route - Protect the route with the `protect` middleware
router.put("/profile", protect, updateProfile);  // Only authenticated users can update their profile

module.exports = router;

