import { Link } from "react-router-dom";

export default function CartSummary({ total, onCheckout}) {
    return  (
        <div className="bg-white p-6 rounded-xl" >
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-4 text-sm">
                <span>Subtotal</span>
                <span>฿{total.toFixed(2)}</span>
            </div>
        

        <div className="flex justify-between mb-4 text-sm" >
            <span>Shipping</span>
            <span>฿0</span>
        </div>

        <div className="flex justify-between font-bold text-lg mt-4" >
            <span>Total</span>
            <span>฿{total.toFixed(2)}</span>
        </div>

      <Link to="/Checkout">
        <button 
            className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            onClick={onCheckout} 
        >
            Proceed To Checkout
        </button>
        </Link>
    </div>
    );
}