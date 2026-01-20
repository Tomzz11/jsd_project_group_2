import moment from 'moment';


const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
};

const paymentStatusColor = {
  "Paid (Simulated)": "bg-green-100 text-green-700",
  "Pending Payment": "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};


export default function OrderDetailsModal({ order, onClose}) {
    if (!order) return null;

     // Function to format number with comma separator
    const formatPrice = (price) => {
        return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Calculate subtotal from order items
    const calculateSubtotal = () => {
        return order.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    };

     const subtotal = calculateSubtotal();

    return (
        <div 
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500"
                >
                     ✕
                </button>

                {/* Header */}
                <h2 className="text-xl font-bold mb-1">Order #{order._id}</h2>
            
            {order.purchaseDate && (
                <p className="text-sm text-gray-500 mb-4">
                    Purchase Date: {moment(order.purchaseDate).format('MMMM Do YYYY, h:mm:ss a')}
                </p>)}

                {/* Status */}
                <div className="flex gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-b-full text-sm ${
                        statusColor[order.status]
                    }`} 
                    >
                        {order.status}
                    </span>

                    <span className={`px-3 py-1 rounded-ful text-sm ${
                        paymentStatusColor[order.paymentStatus]
                    }`}>
                        {order.paymentStatus}
                    </span>
                </div>

                {/* Shipping Address */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-1">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                        {order.shippingAddress.address}{" "}
                        {order.shippingAddress.city}{" "}
                        {order.shippingAddress.postalCode}{" phone number: "}
                        {order.shippingAddress.phone}  
                    </p>
                </div>

                {/* Items */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Items</h3>
                    <div className="space-y-2">
                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between text-sm border-b pb-1"
                            >
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>
                                    ฿{(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className="border-t pt-4 space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>฿{formatPrice(subtotal)}</span>


                    </div>
                    <div className="flex justify-between ">
                        <span>Shipping</span>
                        {/* <span>${order.shipping.toFixed(2)}</span> */}
                        <span>FREE</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>฿{formatPrice(order.total)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}