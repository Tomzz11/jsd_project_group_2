// utils/cartUtils.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// ==========================================
// Helper Functions
// ==========================================

const getToken = () => {
  // ✅ ใช้ชื่อเดียวกับ AuthContext
  return localStorage.getItem('token');
};

const isAuthenticated = () => {
  return !!getToken();
};

// ==========================================
// LocalStorage Functions (สำหรับคนไม่ login)
// ==========================================

export const getLocalCart = () => {
  try {
    const items = localStorage.getItem("maipaws_cart");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

const saveLocalCart = (items) => {
  try {
    localStorage.setItem("maipaws_cart", JSON.stringify(items));
    return true;
  } catch (error) {
    console.error("Error saving cart:", error);
    return false;
  }
};

// ==========================================
// Database Functions (สำหรับคน login)
// ==========================================

const getDbCart = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.data.success) {
      // ✅ แปลงข้อมูลจาก DB ให้เป็นรูปแบบเดียวกับ localStorage
      const items = response.data.data.items.map(item => ({
        _id: item.product._id,
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
        stock: item.product.stock
      }));
      return items;
    }
    return [];
  } catch (error) {
    if (error.response?.status === 404) {
      // ถ้ายังไม่มี cart ใน DB ให้ return array เปล่า
      return [];
    }
    console.error("Error fetching cart from DB:", error);
    return [];
  }
};

const saveDbCart = async (items) => {
  try {
    const token = getToken();
    const formattedItems = items.map(item => ({
      product: item._id || item.product,
      quantity: item.quantity
    }));

    const response = await axios.post(
      `${API_URL}/cart`,
      { items: formattedItems },
      { headers: { Authorization: `Bearer ${token}` }}
    );

    return response.data.success;
  } catch (error) {
    // ถ้า cart มีอยู่แล้ว ให้ใช้ PUT แทน
    if (error.response?.status === 400) {
      return await updateDbCart(items);
    }
    console.error("Error saving cart to DB:", error);
    return false;
  }
};

const updateDbCart = async (items) => {
  try {
    const token = getToken();
    const formattedItems = items.map(item => ({
      product: item._id || item.product,
      quantity: item.quantity
    }));

    const response = await axios.put(
      `${API_URL}/cart`,
      { items: formattedItems },
      { headers: { Authorization: `Bearer ${token}` }}
    );

    return response.data.success;
  } catch (error) {
    console.error("Error updating cart in DB:", error);
    return false;
  }
};

// ==========================================
// Public API (ใช้ DB ถ้า login, ไม่งั้นใช้ localStorage)
// ==========================================

export const getCartItems = async () => {
  if (isAuthenticated()) {
    return await getDbCart();
  }
  return getLocalCart();
};

export const saveCartItems = async (items) => {
  if (isAuthenticated()) {
    return await updateDbCart(items);
  }
  return saveLocalCart(items);
};

export const addToCart = async (product, quantity = 1) => {
  const cartItems = isAuthenticated() 
    ? await getDbCart() 
    : getLocalCart();
  
  // เช็คว่ามีสินค้านี้ในตะกร้าแล้วหรือยัง
  const existingItemIndex = cartItems.findIndex(
    (item) => (item._id === product._id || item.product === product._id)
  );

  if (existingItemIndex !== -1) {
    // ถ้ามีแล้ว เพิ่มจำนวน
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // ถ้ายังไม่มี เพิ่มสินค้าใหม่
    cartItems.push({
      _id: product._id,
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      stock: product.stock
    });
  }

  if (isAuthenticated()) {
    await updateDbCart(cartItems);
  } else {
    saveLocalCart(cartItems);
  }
  
  return cartItems;
};

export const removeFromCart = async (productId) => {
  const cartItems = isAuthenticated() 
    ? await getDbCart() 
    : getLocalCart();
    
  const updatedItems = cartItems.filter(
    (item) => item._id !== productId && item.product !== productId
  );

  if (isAuthenticated()) {
    await updateDbCart(updatedItems);
  } else {
    saveLocalCart(updatedItems);
  }
  
  return updatedItems;
};

export const updateCartItemQuantity = async (productId, quantity) => {
  const cartItems = isAuthenticated() 
    ? await getDbCart() 
    : getLocalCart();
    
  const updatedItems = cartItems.map((item) =>
    (item._id === productId || item.product === productId)
      ? { ...item, quantity }
      : item
  );

  if (isAuthenticated()) {
    await updateDbCart(updatedItems);
  } else {
    saveLocalCart(updatedItems);
  }
  
  return updatedItems;
};

export const clearCart = async () => {
  if (isAuthenticated()) {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Error clearing cart in DB:", error);
    }
  }
  localStorage.removeItem("maipaws_cart");
};

export const getCartTotal = async () => {
  const cartItems = await getCartItems();
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = async () => {
  const cartItems = await getCartItems();
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};

// ==========================================
// Sync Cart (เมื่อ login/logout)
// ==========================================

export const syncCartOnLogin = async () => {
  // เอา cart จาก localStorage ไปรวมกับ DB
  const localCart = getLocalCart();
  
  if (localCart.length > 0) {
    const dbCart = await getDbCart();
    
    // Merge carts
    const mergedCart = [...dbCart];
    
    localCart.forEach(localItem => {
      const existingIndex = mergedCart.findIndex(
        item => (item._id === localItem._id || item.product === localItem._id)
      );
      
      if (existingIndex !== -1) {
        mergedCart[existingIndex].quantity += localItem.quantity;
      } else {
        mergedCart.push(localItem);
      }
    });
    
    await updateDbCart(mergedCart);
    localStorage.removeItem("maipaws_cart"); // ลบ local cart
    
    return mergedCart;
  }
  
  return await getDbCart();
};

export const syncCartOnLogout = async () => {
  // เอา cart จาก DB มาใส่ localStorage
  const dbCart = await getDbCart();
  if (dbCart.length > 0) {
    saveLocalCart(dbCart);
  }
};