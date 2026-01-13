import { useState, useEffect, useRef } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { products } from "../mockdata/products";

export default function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

 useEffect(() => {
  const productlist =
    JSON.parse(localStorage.getItem("productSelectedList")) || []

  const selectedProducts = products.filter(product =>
    productlist.some(item => item.id === product.id)
  )

  setCartItems(selectedProducts)
}, [products])




    const increaseQty = (id) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            )
        );
    };

    const decreaseQty = (id) => {
        setCartItems(items =>
        items.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id))
    };

    const totalPrice = cartItems.reduce(
        ( sum, item ) => sum + item.price * item.quantity,0
    );

    const handleCheckout = () => {
        alert("Checkout successful (simulation) ")
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Shopping Cart
                </h1>

                <button
                    onClick={() =>  alert("Back to shop")}
                    className="mb-4 text-sm text-blue-600 hover:underline"
                >
                    ← Back to shop
                </button>

                <div className={`grid gap-6 ${
                    cartItems.length === 0
                        ? "grid-cols-1"
                        : "grid-cols-1 lg:grid-cols-3"
                    }`}
                >
                    {/* Cart Items */}
                    <div className={`rounded-lg p-4 ${cartItems.length === 0 ? "bg-gray-50 text-center" : "bg-white shadow"} lg:col-span-2`}>

                        { cartItems.length ===0 ?(
                            <p className="py-10 text-gray-400">
                                🛒Your cart is empty
                            </p>
                        ) : ( 
                          <div className="space-y-4">
                            {cartItems.map(item => (
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
                            <CartSummary 
                                total={totalPrice} 
                                onCheckout={handleCheckout}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}