import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext'; // <-- Import

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { cart } = useCart(); // <-- Live Cart Data

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center relative">
        
        <Link to="/" className="text-2xl font-bold tracking-tighter uppercase">Thread<span className="text-gray-400">&</span>Craft</Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide text-gray-800">
          <Link to="/" className="hover:text-black">Home</Link>
          <div className="relative cursor-pointer" onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)}>
            <span className="hover:text-black pb-2">Men</span>
            {showMenu && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white border border-gray-100 shadow-xl py-4 flex flex-col space-y-3 px-6">
                <Link to="/shop" className="hover:text-gray-500 text-sm">All Products</Link>
                <Link to="/shop" className="hover:text-gray-500 text-sm">Shirts</Link>
                <Link to="/shop" className="hover:text-gray-500 text-sm">T-Shirts</Link>
              </motion.div>
            )}
          </div>
          <Link to="/about" className="hover:text-black">About</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>
          <Link to="/track-order" className="hover:text-black">Track Order</Link>
        </div>

        <div className="flex space-x-6 items-center">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-500" />
          <User className="w-5 h-5 cursor-pointer hover:text-gray-500" />
          
          {/* Cart Icon with Link */}
          <Link to="/cart" className="relative cursor-pointer">
            <ShoppingBag className="w-5 h-5 hover:text-gray-500 transition-colors" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;