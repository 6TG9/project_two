const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRETKEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    }
  );
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ status: "error", message: errors.array()[0].msg });
    }

    const { name, email, password, role } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already in use" });
    }

    // SAFE ADMIN CREATION:
    // Only allow "admin" if explicitly passed. Otherwise default to "user".
    const user = new User({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "user",
    });

    await user.save();

    const token = signToken(user);

    res.status(201).json({
      status: "success",
      message: "User Created",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ status: "error", message: errors.array()[0].msg });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid credentials" });

    const token = signToken(user);

    res.json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
