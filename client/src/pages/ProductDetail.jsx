import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0); // Page change hone par top par scroll karein
  }, [id]);

  if (!product) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Left: Image */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-gray-100">
          <img src={product.images[0]} alt={product.name} className="w-full h-[600px] object-cover" />
        </motion.div>

        {/* Right: Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
          <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
          <h1 className="text-4xl font-bold uppercase mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">₹{product.price}</p>
          
          <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase mb-3">Select Size</h3>
            <div className="flex gap-3">
              {['S', 'M', 'L', 'XL'].map((size) => (
                <button 
                  key={size} 
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border flex items-center justify-center font-medium transition-colors ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              if (!selectedSize) return alert("Please select a size first!");
              addToCart(product, selectedSize);
            }}
            className="bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors w-full"
          >
            Add to Cart
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default ProductDetail;