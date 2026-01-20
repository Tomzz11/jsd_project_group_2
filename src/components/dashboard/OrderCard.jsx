const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-blue-100 text-blue-700",
    Shipped: "bg-purple-100 text-purple-700",
    Completed: "bg-green-100 text-green-700",
};



export default function OrderCard({ order, onView }) {
    return (
        <div className="border rounded-lg p-4 flex justify-between items-center bg-white">
            <div>
                <p className="font-semibold">Order #{order._id}</p>
                <p className="text-sm text-gray-500">
                    {order.createdAt}
                </p>
                <p className="mt-1">Total: ฿{order.total.toFixed(2)}</p>
            </div>

            <div className="text-right">
                <span
                    className={`text-sm rounded-full px-3 py-1
                    ${statusColor[order.status]
                    }`}
                >
                    {order.status}
                </span>

                <div>
                    <button
                        onClick={onView}
                        className="mt-2 text-sm underline"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}