const User = require("../Model/usersModel");

//login user
const loginUser = async (req, res) => {
  res.json({
    msg: "user login",
  });
};

//signup user
const signupUser = async (req, res) => {
  res.json({
    msg: "user signup",
  });
};

module.exports = { signupUser, loginUser };
