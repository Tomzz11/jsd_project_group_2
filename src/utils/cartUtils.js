export const getCartItems = () => {
  try {
    const items = localStorage.getItem("maipaws_cart");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

export const saveCartItems = (items) => {
  try {
    localStorage.setItem("maipaws_cart", JSON.stringify(items));
    return true;
  } catch (error) {
    console.error("Error saving cart:", error);
    return false;
  }
};

export const addToCart = (product, quantity = 1) => {
  const cartItems = getCartItems();
  
  // เช็คว่ามีสินค้านี้ในตะกร้าแล้วหรือยัง
  const existingItemIndex = cartItems.findIndex(
    (item) => item._id === product._id
  );

  if (existingItemIndex !== -1) {
    // ถ้ามีแล้ว เพิ่มจำนวน
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // ถ้ายังไม่มี เพิ่มสินค้าใหม่
    cartItems.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      stock: product.stock
    });
  }

  saveCartItems(cartItems);
  return cartItems;
};

export const removeFromCart = (productId) => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter((item) => item._id !== productId);
  saveCartItems(updatedItems);
  return updatedItems;
};

export const updateCartItemQuantity = (productId, quantity) => {
  const cartItems = getCartItems();
  const updatedItems = cartItems.map((item) =>
    item._id === productId ? { ...item, quantity } : item
  );
  saveCartItems(updatedItems);
  return updatedItems;
};

export const clearCart = () => {
  localStorage.removeItem("maipaws_cart");
};

export const getCartTotal = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = () => {
  const cartItems = getCartItems();
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};
