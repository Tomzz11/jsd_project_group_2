import { useState } from "react";
import { orders } from "../mockdata/orders.js";
import OrderCard from "./OrderCard.jsx";
import OrderDetailsModal from "./OrderDetailsModal.jsx";

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-sm text-gray-500">
              You have no orders yet.
            </p>
          ) : (
            orders.map(order => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onView={() => setSelectedOrder(order)}
                />
              ))
            )}
        </div>
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