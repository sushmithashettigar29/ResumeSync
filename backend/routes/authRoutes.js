// routes/authRoutes.js
const express = require("express");
const { register, login, updateProfile, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register); // Registration endpoint
router.post("/login", login);       // Login endpoint
router.put("/profile", protect, updateProfile); // Update profile
router.get("/profile", protect, getProfile);    // Get profile

module.exports = router;



