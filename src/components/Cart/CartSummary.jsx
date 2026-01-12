export default function CartSummary({ total, onCheckout}) {
    return  (
        <div className="bg-gray-50 p-6 rounded-xl" >
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
            </div>
        

        <div className="flex justify-between mb-2" >
            <span>Shipping</span>
            <span>$0</span>
        </div>

        <div className="flex justify-between font-bold text-lg mt-4" >
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
        </div>

        <button 
            className="w-full mt-6 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
            onClick={onCheckout} 
        >
            Checkout
        </button>
    </div>
    );
}