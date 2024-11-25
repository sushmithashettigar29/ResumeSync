const multer = require("multer");
const path = require("path");

// Set up storage for the uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    cb(null, Date.now() + ext);  // Generate a unique filename based on current timestamp
  },
});

// Filter for image types (png, jpeg, jpg)
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error("Only PNG, JPG, and JPEG files are allowed"), false); // Reject if it's not an image
  }
};

// Create multer instance with storage configuration and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5MB
});

module.exports = upload;
