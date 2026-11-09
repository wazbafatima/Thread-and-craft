const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Saare products get karne ka route
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Naya product add karne ka route
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, images, sizes, colors, stock } = req.body;
    
    const newProduct = new Product({
      name, description, price, category, images, sizes, colors, stock
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 3. Ek specific product ki detail lene ka route
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ye line sabse zaroori hai
module.exports = router;