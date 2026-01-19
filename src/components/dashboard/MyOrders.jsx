import { useState , useEffect } from "react";
// import { orders } from "../mockdata/orders.js";
import OrderCard from "./OrderCard.jsx";
import OrderDetailsModal from "./OrderDetailsModal.jsx";
import axios from "axios";
import { config } from "../../config/config.js";



export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

 useEffect(() => {
  

    fetchMyOrders();
  },[]);

  const getToken = () => localStorage.getItem("maipaws_token"); //getLocalStorage
  const fetchMyOrders = async () => {
    setLoading(true);
    try {

      const response = await axios.get(`${config.apiUrl}/api/orders/myorders`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });

        if (response.status === 200) {setOrders(response.data.data)};

    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>)
              : orders.length === 0 ? (
            <p className="text-sm text-gray-500">
              You have no orders yet.
            </p>
          ) : (
            orders.map((item, index) => (
                <OrderCard
                  key={item._id || index}
                  order={item}
                  onView={() => setSelectedOrder(item)}
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