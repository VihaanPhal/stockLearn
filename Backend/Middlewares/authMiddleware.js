const jwt = require("jsonwebtoken");
const User = require("../Model/usersModel");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("Authorization header missing");
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, "secret");
    req.user = await User.findOne({ _id }).select("_id");
    if (!req.user) {
      console.log("User not found");
      return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
