const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/user");
const { userRegisterValidator } = require("../middlewares/user");
const { userLoginValidator } = require("../middlewares/user");

const auth = require("../middlewares/auth"); // Replace this with your auth middleware file path

router.get("/protectedRoute", auth, (req, res) => {
  // Your route handler code here
});

console.log("Register:", register);
console.log("Login:", login);
console.log("Logout:", logout);

router.post("/login", userLoginValidator, login);
router.post("/register", userRegisterValidator, register);
router.get("/logout", logout);

module.exports = router;
