import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart(); // totalPrice CartContext mein add karna hoga (niche dekhein)
  const navigate = useNavigate();
  
  const [address, setAddress] = useState({
    fullName: '', address: '', city: '', postalCode: '', phone: ''
  });

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        orderItems: cart.map(item => ({
          name: item.name,
          qty: 1,
          image: item.images[0],
          price: item.price,
          size: item.selectedSize,
          product: item._id
        })),
        shippingAddress: address,
        totalPrice: cart.reduce((acc, item) => acc + item.price, 0)
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      alert('Order Placed Successfully! 🎉');
      clearCart(); // Cart khali karein
      navigate('/'); // Home page par wapas bhejein
    } catch (error) {
      alert('Something went wrong!');
    }
  };

  return (
    <div className="pt-32 min-h-screen max-w-3xl mx-auto px-4 pb-20">
      <h1 className="text-4xl font-bold uppercase mb-10 tracking-tighter">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-50 p-8">
        <h2 className="text-xl font-bold uppercase mb-4">Shipping Address</h2>
        
        <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} className="border p-4 outline-none focus:border-black" />
        <input type="text" name="address" placeholder="Street Address" required onChange={handleChange} className="border p-4 outline-none focus:border-black" />
        <div className="flex gap-4">
          <input type="text" name="city" placeholder="City" required onChange={handleChange} className="border p-4 outline-none focus:border-black w-1/2" />
          <input type="text" name="postalCode" placeholder="Postal Code" required onChange={handleChange} className="border p-4 outline-none focus:border-black w-1/2" />
        </div>
        <input type="text" name="phone" placeholder="Phone Number" required onChange={handleChange} className="border p-4 outline-none focus:border-black" />

        <button type="submit" className="bg-black text-white p-4 mt-6 uppercase font-bold tracking-widest hover:bg-gray-800">
          Place Order (Cash on Delivery)
        </button>
      </form>
    </div>
  );
};

export default Checkout;