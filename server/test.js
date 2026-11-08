const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// Database se connect karein (agar .env theek nahi chal raha toh direct link use karein)
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/threadcraft")
  .then(async () => {
    console.log('✅ DB Connected for testing...');

    // Ek dummy product banayein
    const newProduct = new Product({
      name: "Classic Oversized Tee",
      description: "Premium quality 100% cotton oversized t-shirt.",
      price: 1499,
      category: "Oversized Tees",
      images: ["https://example.com/tee.jpg"],
      sizes: ["M", "L", "XL"],
      colors: ["Black", "Olive Green"],
      stock: 50,
      isFeatured: true
    });

    // Product ko save karein
    await newProduct.save();
    console.log('🎉 Dummy Product Saved Successfully!');

    // Kaam khatam, connection band karein
    mongoose.connection.close();
  })
  .catch((err) => console.log('❌ Error:', err));