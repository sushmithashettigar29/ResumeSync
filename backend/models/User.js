// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "" }, // Optional bio field
  profilePhoto: { type: String, default: "" }, // Optional profile photo field
});

module.exports = mongoose.model("User", UserSchema);

