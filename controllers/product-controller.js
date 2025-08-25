const Product = require("../models/product-model.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findOne({ id: parseInt(id) });
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findOneAndUpdate(
      { id: parseInt(id) }, 
      req.body, 
      {
        new: true,
        runValidators: true
      }
    );
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findOneAndDelete({ id: parseInt(id) });
    if (!products) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getProducts, getProduct, createProduct, updateProduct, deleteProduct };