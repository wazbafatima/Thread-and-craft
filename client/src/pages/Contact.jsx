import React from 'react';

const Contact = () => {
  return (
    <div className="pt-32 min-h-screen max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold uppercase mb-8 text-center">Contact Us</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="border p-4 rounded outline-none focus:border-black" />
        <input type="email" placeholder="Your Email" className="border p-4 rounded outline-none focus:border-black" />
        <textarea placeholder="Your Message" className="border p-4 rounded outline-none focus:border-black h-32"></textarea>
        <button className="bg-black text-white p-4 font-bold uppercase tracking-widest hover:bg-gray-800">Send Message</button>
      </form>
    </div>
  );
};
export default Contact;