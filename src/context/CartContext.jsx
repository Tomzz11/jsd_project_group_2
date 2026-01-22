import { createContext, useContext, useState, useEffect } from "react";
import * as cartUtils from "../utils/cartUtils";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // ✅ โหลดตะกร้าเมื่อ user เปลี่ยน (Admin ไม่โหลด cart)
  useEffect(() => {
    if (user?.role === "admin") {
      setCartItems([]);
      setCartCount(0);
      setLoading(false);
      return;
    }

    loadCart();
  }, [user]);

  const loadCart = async () => {
    setLoading(true);
    try {
      const items = await cartUtils.getCartItems();
      setCartItems(items);
      updateCartCount(items);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartCount = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  // ✅ Admin ไม่สามารถเพิ่มสินค้าลงตะกร้า
  const addToCart = async (product, quantity = 1) => {
    if (user?.role === "admin") {
      return false;
    }

    try {
      const updatedItems = await cartUtils.addToCart(product, quantity);
      setCartItems(updatedItems);
      updateCartCount(updatedItems);
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedItems = await cartUtils.removeFromCart(productId);
      setCartItems(updatedItems);
      updateCartCount(updatedItems);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      const updatedItems = await cartUtils.updateCartItemQuantity(
        productId,
        quantity
      );
      setCartItems(updatedItems);
      updateCartCount(updatedItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const clearCart = async () => {
    try {
      await cartUtils.clearCart();
      setCartItems([]);
      setCartCount(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // ✅ Sync cart เมื่อ login (สำหรับ user เท่านั้น)
  const syncCartOnLogin = async () => {
    if (user?.role === "admin") {
      setCartItems([]);
      setCartCount(0);
      return [];
    }

    try {
      const mergedCart = await cartUtils.syncCartOnLogin();
      setCartItems(mergedCart);
      updateCartCount(mergedCart);
      return mergedCart;
    } catch (error) {
      console.error("Error syncing cart on login:", error);
      return [];
    }
  };

  // ✅ Sync cart เมื่อ logout
  const syncCartOnLogout = async () => {
    try {
      await cartUtils.syncCartOnLogout();
      setCartItems([]);
      setCartCount(0);
    } catch (error) {
      console.error("Error syncing cart on logout:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        loadCart,
        syncCartOnLogin,
        syncCartOnLogout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


