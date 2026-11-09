import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Cart mein item add karna
  const addToCart = (product, size) => {
    setCart((prev) => [...prev, { ...product, selectedSize: size, cartItemId: Date.now() }]);
  };

  // 2. Cart se item remove karna
  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // 3. Order place hone ke baad poora cart khali karna
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};