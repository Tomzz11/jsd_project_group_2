const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  paid: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderCard({ order, onView }) {
  const status = order.status?.toLowerCase() || "pending";

  return (
    <div className="border rounded-lg p-4 flex justify-between items-center bg-white">
      <div>
        <p className="font-semibold">Order #{order._id?.slice(-6).toUpperCase()}</p>
        <p className="text-sm text-gray-500">
          {order.createdAt ? new Date(order.createdAt).toLocaleDateString("th-TH") : "-"}
        </p>
        <p className="mt-1">Total: ฿{(order.total || 0).toLocaleString()}</p>
      </div>

      <div className="text-right">
        <span
          className={`text-sm rounded-full px-3 py-1 ${statusColor[status] || statusColor.pending}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>

        <div>
          <button onClick={onView} className="mt-2 text-sm underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}


