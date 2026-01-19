// pages/Cart.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/Cart/CartItem";
import CartSummary from "../components/Cart/CartSummary";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
    loading,
  } = useCart();

  const totalPrice = getTotalPrice();

  const handleIncrease = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const handleDecrease = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item && item.quantity > 1) updateQuantity(productId, item.quantity - 1);
  };

  const handleRemove = (productId) => {
    if (confirm("คุณต้องการลบสินค้านี้ออกจากตะกร้าหรือไม่?")) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    navigate("/checkout");
  };

  const handleClearCart = () => {
    if (confirm("คุณต้องการล้างตะกร้าสินค้าทั้งหมดหรือไม่?")) {
      clearCart();
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="mt-1 text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          {cartItems.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Your cart is empty
            </h3>
            <p className="mt-2 text-gray-500">
              Add some pet products to get started
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="mt-6"
              size="lg"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-700">
                  Cart Items
                </h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.productId}              // ✅ เปลี่ยน
                      item={item}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => navigate("/products")}
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
                <CartSummary total={totalPrice} onCheckout={handleCheckout} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
