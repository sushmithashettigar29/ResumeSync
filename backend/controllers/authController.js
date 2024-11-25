// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePhoto: user.profilePhoto, // Include profile photo in the response
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get the user's ID from the JWT token
    const { username, email, bio } = req.body;

    // If a photo is uploaded, use the file path
    const profilePhoto = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Prepare the update data
    const updatedData = {
      name: username,
      email: email,
      bio: bio,
    };

    if (profilePhoto) {
      updatedData.profilePhoto = profilePhoto; // Save the photo path if provided
    }

    // Update the user record in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Return the updated user document
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Find the user by ID from the token
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user }); // Send user data back to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};