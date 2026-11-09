import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', image: '', stock: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', { ...formData, images: [formData.image], sizes: ["M", "L", "XL"] });
      setMessage('Product Added Successfully! ✅');
      setFormData({ name: '', description: '', price: '', category: '', image: '', stock: '' });
    } catch (error) { setMessage('Error adding product ❌'); }
  };

  return (
    <div className="pt-32 min-h-screen bg-[#f5f5f5] flex justify-center pb-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Add New Product</h2>
        {message && <p className="mb-4 text-center font-medium text-blue-600">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className="border p-3 rounded outline-none focus:border-black" />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="border p-3 rounded outline-none focus:border-black h-24"></textarea>
          <div className="flex gap-4">
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} required className="border p-3 rounded outline-none focus:border-black w-1/2" />
            <input type="number" name="stock" placeholder="Stock Qty" value={formData.stock} onChange={handleChange} required className="border p-3 rounded outline-none focus:border-black w-1/2" />
          </div>
          <input type="text" name="category" placeholder="Category (e.g., Shirts)" value={formData.category} onChange={handleChange} required className="border p-3 rounded outline-none focus:border-black" />
          <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required className="border p-3 rounded outline-none focus:border-black" />
          <button type="submit" className="bg-black text-white p-4 mt-2 rounded font-bold uppercase tracking-widest hover:bg-gray-800 transition">Add Product</button>
        </form>
      </div>
    </div>
  );
};
export default Admin;