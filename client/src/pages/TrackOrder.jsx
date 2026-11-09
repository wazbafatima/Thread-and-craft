import React from 'react';

const TrackOrder = () => {
  return (
    <div className="pt-32 min-h-screen max-w-xl mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold uppercase mb-4">Track Your Order</h1>
      <p className="text-gray-500 mb-8">Enter your Order ID below to see the status.</p>
      <div className="flex gap-2">
        <input type="text" placeholder="Order ID (e.g., #12345)" className="border p-4 rounded outline-none focus:border-black w-full" />
        <button className="bg-black text-white px-8 py-4 font-bold uppercase tracking-widest">Track</button>
      </div>
    </div>
  );
};
export default TrackOrder;