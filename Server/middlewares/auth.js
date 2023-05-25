const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user"); // Replace this with your user model file path

const auth = async (req, res, next) => {
  try {
    // Check if the JWT token exists
    if (!req.cookies.jwt) {
      return res
        .status(401)
        .json({ error: "You must be logged in to access this route" });
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

    // Check if user exists
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add user to request object
    req.user = user;

    // Check if there's a user in the session
    if (req.user) {
      // If user is logged in, send a response immediately
      return res.status(400).json({ error: "You are already logged in." });
    }

    // Call next middleware
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error verifying token: " + err.message });
  }
};
module.exports = auth;
