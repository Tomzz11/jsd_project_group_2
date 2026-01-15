import { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { products } from "../mockdata/products";

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
  const productlist =
    JSON.parse(localStorage.getItem("productSelectedList")) || [];

  const selectedProducts = productlist.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);

    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  setCartItems(selectedProducts);
}, []);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    alert("Checkout successful (simulation) ");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-sm text-gray-500">
            Review your items before checkout
          </p>
        </div>

        {/* <button
          onClick={() => alert("Back to shop")}
          className="mt-3 mb-3 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Back to shop
        </button> */}

        <div
          className={`grid gap-6 ${
            cartItems.length === 0
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-3"
          }`}
        >
          {/* Cart Items */}
          <div
            className={`rounded-lg p-4 ${
              cartItems.length === 0
                ? "bg-gray-50 text-center"
                : "bg-white shadow"
            } lg:col-span-2`}
          >
            {/* Section Title */}
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              Cart Items
            </h2>

            {cartItems.length === 0 ? (
              <div className="py-10 text-gray-400">
                <p className="text-lg">🛒Your cart is empty</p>
                <p className="mt-1 text-sm">
                  Add some pet products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={increaseQty}
                    onDecrease={decreaseQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div className="h-fit rounded-lg bg-white p-4 shadow">
              <CartSummary total={totalPrice} onCheckout={handleCheckout} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
