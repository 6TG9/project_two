const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token)
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
    // attach user info to request (you can fetch from DB for fresh data)
    const user = await User.findById(payload.id).select("-password");
    if (!user)
      return res
        .status(401)
        .json({ status: "error", message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    // Token expired or invalid
    return res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};

module.exports = auth;
