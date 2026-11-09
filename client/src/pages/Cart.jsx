import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  // Total Price calculate karna
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="pt-32 min-h-screen max-w-[1000px] mx-auto px-4 pb-20">
      <h1 className="text-4xl font-bold uppercase mb-10 tracking-tighter">Your Cart</h1>

      {cart.length === 0 ? (
        // Agar cart khali hai
        <div className="text-center py-20 bg-gray-50">
          <p className="text-gray-500 mb-6 text-lg">Your cart is empty.</p>
          <Link to="/shop" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        // Agar cart mein items hain
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Side: Cart Items List */}
          <div className="flex-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex gap-4 border-b border-gray-200 py-6">
                <img 
                  src={item.images[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"} 
                  alt={item.name} 
                  className="w-24 h-32 object-cover bg-gray-100" 
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                  <p className="text-sm font-medium">Size: {item.selectedSize}</p>
                  <p className="font-semibold mt-2">₹{item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartItemId)} 
                  className="text-gray-400 hover:text-red-500 h-fit transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[350px] bg-gray-50 p-6 h-fit">
            <h2 className="text-xl font-bold uppercase mb-6">Order Summary</h2>
            
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="border-t border-gray-300 my-4"></div>
            
            <div className="flex justify-between mb-6 font-bold text-lg">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
            
            {/* Checkout Button */}
            <Link 
              to="/checkout" 
              className="w-full block text-center bg-black text-white py-4 uppercase tracking-widest font-bold text-sm hover:bg-gray-800 transition"
            >
              Proceed to Checkout
            </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;