import { createContext, useContext, useState, useEffect } from 'react';
import * as cartUtils from '../utils/cartUtils';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // โหลดตะกร้าจาก localStorage ตอนเริ่มต้น
  useEffect(() => {
    const items = cartUtils.getCartItems();
    setCartItems(items);
    updateCartCount(items);
  }, []);

  const updateCartCount = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = (product, quantity = 1) => {
    const updatedItems = cartUtils.addToCart(product, quantity);
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
    return true;
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartUtils.removeFromCart(productId);
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedItems = cartUtils.updateCartItemQuantity(productId, quantity);
    setCartItems(updatedItems);
    updateCartCount(updatedItems);
  };

  const clearCart = () => {
    cartUtils.clearCart();
    setCartItems([]);
    setCartCount(0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};