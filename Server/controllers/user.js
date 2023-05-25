const User = require("../models/user");
const uuidv1 = require("uuidv1");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request body is missing" });
    return;
  }
  const { email, password } = req.body; // move this line here
  if (!email || !password) {
    res.status(400).send({ message: "Email and password are required" });
    return;
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with that email does not exist. Please signup." });
    }
    if (!user.authenticate(password)) {
      return res
        .status(400)
        .json({ error: "Email and password do not match." });
    }

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // persist the token as 't' in cookie with expiry date
    res.cookie("jwt", token, { expire: new Date() + 9999, httpOnlu: true });

    // return response with user and token to frontend client
    const { username } = user;
    return res.json({
      message: "Login Successful!",
      username,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.register = async (req, res) => {
  console.log("Request body:", req.body);

  try {
    const usernameExists = await User.findOne({
      username: req.body.username,
    });
    const emailExists = await User.findOne({
      email: req.body.email,
    });

    console.log("usernameExists:", usernameExists);
    console.log("emailExists:", emailExists);

    if (usernameExists) {
      return res.status(403).json({
        error: "Username already taken",
      });
    }
    if (emailExists) {
      return res.status(403).json({
        error: "Email already taken",
      });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      message: "Signup Successful!",
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({
      error: "An error occurred while processing your request",
    });
  }
};
exports.logout = async (req, res) => {
  // Clear the cookie that holds the JWT token
  res.clearCookie("jwt");

  // Send a response to the client
  res.json({
    message: "Logout Successful!",
  });
};
