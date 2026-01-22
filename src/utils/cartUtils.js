import { cartAPI } from "../services/api";

const LOCAL_KEY = "maipaws_cart";

const getToken = () => localStorage.getItem("token");
const isAuthenticated = () => !!getToken();

const getProductId = (x) =>
  x?.product?._id || x?.productId || x?.product || x?._id;

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

// ✅ ล้าง localStorage cart
export const clearLocalCart = () => {
  localStorage.removeItem(LOCAL_KEY);
};

// ----------------------
// DB
// ----------------------
const getDbCart = async () => {
  try {
    const res = await cartAPI.get();

    if (!res.data?.success) return [];

    const items = res.data.data?.items || [];
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

    const res = await cartAPI.upsert(formattedItems);
    return !!res.data?.success;
  } catch (error) {
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

  const existingIndex = cartItems.findIndex(
    (i) => (i.productId || getProductId(i)) === productId
  );

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
  const updatedItems = cartItems.filter(
    (i) => (i.productId || getProductId(i)) !== productId
  );

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
// Sync (แก้ไขปัญหา x2)
// ----------------------
export const syncCartOnLogin = async () => {
  const localCart = getLocalCart();

  // ✅ ล้าง localStorage ทันทีเพื่อป้องกัน sync ซ้ำ
  clearLocalCart();

  // ถ้าไม่มีสินค้าใน localStorage ให้ดึงจาก DB
  if (localCart.length === 0) {
    return await getDbCart();
  }

  // ดึง cart จาก DB
  const dbCart = await getDbCart();

  // ✅ Merge โดยไม่ให้ซ้ำ
  const merged = [...dbCart];

  for (const localItem of localCart) {
    const pid = localItem.productId || getProductId(localItem);
    const existingIndex = merged.findIndex(
      (d) => (d.productId || getProductId(d)) === pid
    );

    if (existingIndex !== -1) {
      // ✅ ไม่บวกเพิ่ม แต่ใช้ค่า max แทน
      merged[existingIndex].quantity = Math.max(
        merged[existingIndex].quantity,
        localItem.quantity
      );
    } else {
      merged.push({ ...localItem, productId: pid });
    }
  }

  // บันทึกลง DB
  await upsertDbCart(merged);

  return merged;
};

export const syncCartOnLogout = async () => {
  // ✅ ล้าง localStorage เมื่อ logout (ไม่เก็บ cart ของ user คนก่อน)
  clearLocalCart();
};

