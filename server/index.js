const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Thread and Craft API is running...');
});

// Server ko start karne wala code (Ye sabse zaroori hai)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});