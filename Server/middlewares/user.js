const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const express = require("express");
const app = express();

exports.userRegisterValidator = (req, res, next) => {
  // username is not null
  app.use(express.json());
  app.post(
    "/register",
    [
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
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/i)
        .withMessage(
          "Password must contain one uppercase, one lowercase, one number, and one special symbol"
        ),
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    }
  );

  next();
};

exports.userById = async (req, res, next) => {
  User.findById(req._id).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // add user object in req with all user info
    req.user = user;

    next();
  });
};
