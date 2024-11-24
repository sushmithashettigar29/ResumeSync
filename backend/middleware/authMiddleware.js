const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Check for token in Authorization header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify the token using the JWT_SECRET (it must match the one used to sign the token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user data (id) to the request object
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
