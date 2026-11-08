const mongoose = require('mongoose');

// Product ka Structure (Schema)
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  category: { 
    type: String, 
    required: true // Jaise: "Shirts", "Oversized Tees", "Trousers"
  },
  images: [{ 
    type: String // Yahan images ke Cloudinary links aayenge
  }],
  sizes: [{ 
    type: String // Jaise: ["S", "M", "L", "XL"]
  }],
  colors: [{ 
    type: String // Jaise: ["Black", "White", "Olive"]
  }],
  stock: { 
    type: Number, 
    default: 0 // Kitne piece available hain
  },
  isFeatured: { 
    type: Boolean, 
    default: false // Kya ye product Homepage par dikhana hai?
  }
}, { 
  timestamps: true // Ye khud hi batayega ke product kab add hua (createdAt) aur kab update hua (updatedAt)
});

// Model banayein aur export karein
const Product = mongoose.model('Product', productSchema);
module.exports = Product;