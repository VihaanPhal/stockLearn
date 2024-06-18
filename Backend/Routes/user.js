// Backend/Routes/user.js
const { loginUser, signupUser } = require("../Controller/usersController");
const express = require("express");
const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

module.exports = router;
    