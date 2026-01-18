// utils/cartUtils.js
import { cartAPI } from "../services/api"; // ปรับ path ให้ตรงโปรเจกต์อัส

const LOCAL_KEY = "maipaws_cart";

const getToken = () => localStorage.getItem("token");
const isAuthenticated = () => !!getToken();

// รองรับ product เป็น object/string และ item เป็นหลายรูปแบบ
const getProductId = (x) => x?.product?._id || x?.productId || x?.product || x?._id;

// ----------------------
// LocalStorage
// ----------------------
export const getLocalCart = () => {
  try {
    const items = localStorage.getItem(LOCAL_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

const saveLocalCart = (items) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error("Error saving cart:", error);
    return false;
  }
};

// ----------------------
// DB
// ----------------------
const getDbCart = async () => {
  try {
    const res = await cartAPI.get();

    if (!res.data?.success) return [];

    const items = res.data.data?.items || [];
    // normalize ให้เป็น format เดียวกัน: productId เป็นตัวเดียว
    return items.map((item) => ({
      productId: item.product?._id,
      name: item.product?.name,
      price: item.product?.price,
      image: item.product?.image,
      quantity: item.quantity,
      stock: item.product?.stock,
    }));
  } catch (error) {
    if (error.response?.status === 404) return [];
    console.error("Error fetching cart from DB:", error);
    return [];
  }
};

const upsertDbCart = async (items) => {
  try {
    const formattedItems = items.map((item) => ({
      product: item.productId || getProductId(item),
      quantity: item.quantity,
    }));

    // ใช้ PUT เป็นหลัก (upsert)
    const res = await cartAPI.upsert(formattedItems);
    return !!res.data?.success;
  } catch (error) {
    // ถ้า backend ของอัสบังคับให้ POST ตอนยังไม่มี cart
    // ค่อย fallback ไป create ได้
    if (error.response?.status === 400) {
      try {
        const formattedItems = items.map((item) => ({
          product: item.productId || getProductId(item),
          quantity: item.quantity,
        }));
        const res2 = await cartAPI.create(formattedItems);
        return !!res2.data?.success;
      } catch (e2) {
        console.error("Error creating cart in DB:", e2);
        return false;
      }
    }

    console.error("Error upserting cart in DB:", error);
    return false;
  }
};

// ----------------------
// Public API
// ----------------------
export const getCartItems = async () => {
  return isAuthenticated() ? await getDbCart() : getLocalCart();
};

export const saveCartItems = async (items) => {
  return isAuthenticated() ? await upsertDbCart(items) : saveLocalCart(items);
};

export const addToCart = async (product, quantity = 1) => {
  const cartItems = isAuthenticated() ? await getDbCart() : getLocalCart();
  const productId = getProductId(product);

  const existingIndex = cartItems.findIndex((i) => (i.productId || getProductId(i)) === productId);

  if (existingIndex !== -1) {
    cartItems[existingIndex].quantity += quantity;
  } else {
    cartItems.push({
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      stock: product.stock,
    });
  }

  await saveCartItems(cartItems);
  return cartItems;
};

export const removeFromCart = async (productId) => {
  const cartItems = isAuthenticated() ? await getDbCart() : getLocalCart();
  const updatedItems = cartItems.filter((i) => (i.productId || getProductId(i)) !== productId);

  await saveCartItems(updatedItems);
  return updatedItems;
};

export const updateCartItemQuantity = async (productId, quantity) => {
  const cartItems = isAuthenticated() ? await getDbCart() : getLocalCart();
  const updatedItems = cartItems.map((i) =>
    (i.productId || getProductId(i)) === productId ? { ...i, quantity } : i
  );

  await saveCartItems(updatedItems);
  return updatedItems;
};

export const clearCart = async () => {
  if (isAuthenticated()) {
    try {
      await cartAPI.clear();
    } catch (error) {
      console.error("Error clearing cart in DB:", error);
    }
  }
  localStorage.removeItem(LOCAL_KEY);
};

// ----------------------
// Sync
// ----------------------
export const syncCartOnLogin = async () => {
  const localCart = getLocalCart();

  const dbCart = await getDbCart();
  if (localCart.length === 0) return dbCart;

  const merged = [...dbCart];

  for (const localItem of localCart) {
    const pid = localItem.productId || getProductId(localItem);
    const idx = merged.findIndex((d) => (d.productId || getProductId(d)) === pid);

    if (idx !== -1) merged[idx].quantity += localItem.quantity;
    else merged.push({ ...localItem, productId: pid });
  }

  await upsertDbCart(merged);
  localStorage.removeItem(LOCAL_KEY);
  return merged;
};

export const syncCartOnLogout = async () => {
  const dbCart = await getDbCart();
  if (dbCart.length > 0) saveLocalCart(dbCart);
};
