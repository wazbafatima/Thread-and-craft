const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes Import
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes'); // <-- Order Route Import

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/threadcraft")
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // <-- Order Route Added

app.get('/', (req, res) => {
  res.send('Thread and Craft API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});