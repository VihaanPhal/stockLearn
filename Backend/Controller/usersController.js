// Backend/Controller/usersController.js
const User = require("../Model/usersModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "secret", {
    expiresIn: "3d",
  });
};
// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //create token
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({
      email,
      token,
      msg: "login successfull ",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// Signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //create token

    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({
      email,
      token,
      msg: "signup successfull ",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = { signupUser, loginUser };
