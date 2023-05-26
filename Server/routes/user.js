const express = require("express");
const router = express.Router();

// import controllers
const {
  register,
  login,
  logout,
  getLoggedInUser,
} = require("../controllers/user");

// import middlewares
const { userRegisterValidator, userById } = require("../middlewares/user");
const { verifyToken } = require("../middlewares/auth");

// api routes
router.post("/register", userRegisterValidator, register);
console.log("test");
router.post("/login", login);
console.log("test2");
router.get("/logout", logout);
console.log("test3");
router.get("/user", verifyToken, userById, getLoggedInUser);
console.log("test");

module.exports = router;
