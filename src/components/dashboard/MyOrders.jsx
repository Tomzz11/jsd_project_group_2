import { useState, useEffect } from "react";
import OrderCard from "./OrderCard.jsx";
import OrderDetailsModal from "./OrderDetailsModal.jsx";
import { useAuth } from "../../context/AuthContext";
import { orderAPI } from "../../services/api"; // ✅ เปลี่ยนมาใช้ instance

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    if (user) fetchMyOrders();
  }, [user]);

  const fetchMyOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderAPI.getMyOrders(); // ✅ token ถูกแนบให้เองแล้ว
      if (response.data?.success) {
        setOrders(response.data.data || []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.response?.data?.message || "เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ");
    } finally {
      setLoading(false);
    }
  };
;

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">My Orders</h2>
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={fetchMyOrders}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      <div className="bg-white rounded-xl shadow p-4">
        {orders.length === 0 ? (
          <div className="py-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              No orders yet
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Start shopping to see your orders here
            </p>
            <a
              href="/products"
              className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((item, index) => (
              <OrderCard
                key={item._id || index}
                order={item}
                onView={() => setSelectedOrder(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}