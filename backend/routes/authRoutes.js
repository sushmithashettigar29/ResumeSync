// routes/authRoutes.js
const express = require("express");
const {
  register,
  login,
  updateProfile,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); // Middleware to protect routes

const router = express.Router();

router.post("/register", register); // User registration
router.post("/login", login); // User login
router.put("/profile", protect, updateProfile); // Update user profile

// Add the GET route for fetching user profile
router.get("/profile", protect, getProfile);

module.exports = router;
