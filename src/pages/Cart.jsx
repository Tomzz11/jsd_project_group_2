import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from '@/components/Cart/CartItem';
import CartSummary from '@/components/Cart/CartSummary';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    clearCart 
  } = useCart();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-sm text-gray-500">
              Review your items before checkout
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Clear Cart
            </button>
          )}
        </div>

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
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              Cart Items
            </h2>

            {cartItems.length === 0 ? (
              <div className="py-10 text-gray-400">
                <p className="text-lg">🛒 Your cart is empty</p>
                <p className="mt-1 text-sm">
                  Add some pet products to get started
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="mt-4 rounded-lg bg-primary px-6 py-2 text-white hover:opacity-90"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    item={item}
                    onIncrease={() => updateQuantity(item._id, item.quantity + 1)}
                    onDecrease={() => updateQuantity(item._id, item.quantity - 1)}
                    onRemove={() => removeFromCart(item._id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div className="h-fit rounded-lg bg-white p-4 shadow">
              <CartSummary 
                total={getTotalPrice()} 
                onCheckout={handleCheckout} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
