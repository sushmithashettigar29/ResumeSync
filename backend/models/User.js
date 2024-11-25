// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" }, // Add bio field with default value as empty string
  profilePhoto: { type: String, default: "" }, // Add profilePhoto field to store photo URL or path
});

module.exports = mongoose.model("User", UserSchema);
