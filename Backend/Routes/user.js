// Backend/Routes/user.js
const { loginUser, signupUser } = require("../Controller/usersController");
const {
  buyStocks,
  sellStocks,
  getPortfolio,
  getBuyingPower,
} = require("../Controller/BuySellController");
const express = require("express");
const requireAuth = require("../Middlewares/authMiddleware");
const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Apply authentication middleware to the following routes
router.use(requireAuth);

// Buy stocks route
router.post("/buy", buyStocks);

// Sell stocks route
router.post("/sell", sellStocks);

//get portfolio of the current user
router.get("/getPortfolio", getPortfolio);

router.get("/getBuyingPower", getBuyingPower);

module.exports = router;
