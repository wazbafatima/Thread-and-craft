import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // <-- Import Link

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}> {/* <-- Wrap in Link */}
      <motion.div whileHover={{ y: -10 }} className="group cursor-pointer">
        <div className="w-full aspect-[3/4] overflow-hidden bg-gray-200 mb-4 relative">
          <img 
            src={product.images[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.category}</p>
          </div>
          <p className="font-medium">₹{product.price}</p>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;