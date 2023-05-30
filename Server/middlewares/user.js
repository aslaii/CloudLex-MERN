const { body, validationResult } = require("express-validator");
const User = require("../models/user");
exports.validateUserRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)
    .withMessage(
      "Password must contain one uppercase, one lowercase, one number, and one special symbol"
    ),
];

exports.userById = async (req, res, next) => {
  try {
    const user = await User.findById(req._id).exec();
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
