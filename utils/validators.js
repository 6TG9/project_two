const { body } = require("express-validator");

const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least six(6) chars"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("password required"),
];

const productValidation = [
  body("title").notEmpty().withMessage("Title required"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
];

module.exports = { registerValidation, loginValidation, productValidation };
