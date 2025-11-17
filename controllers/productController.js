const Product = require("../models/product");
const { validationResult } = require("express-validator");

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(400)
        .json({ status: "error", message: errors.array()[0].msg });

    const product = new Product({ ...req.body, createdBy: req.user._id });
    await product.save();
    res
      .status(201)
      .json({ status: "success", message: "Product created", data: product });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("createdBy", "name email");
    res.json({
      status: "success",
      message: "Products fetched",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res.json({ status: "success", data: product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res.json({ status: "success", message: "Product updated", data: product });
  } catch (err) {
    next(err);
  }
};


exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product)
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    res.json({ status: "success", message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
