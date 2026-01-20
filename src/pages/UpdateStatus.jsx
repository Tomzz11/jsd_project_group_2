import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateStatus = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // State สำหรับจัดการป๊อปอัพรายละเอียด
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 1. ดึงข้อมูลออเดอร์ (เชื่อมกับ GET /api/orders)
  const fetchOrders = async () => {
    try {
      const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
      const userInfo = storedUser ? JSON.parse(storedUser) : null;
      const token = userInfo?.token || userInfo?.data?.token || userInfo;

      if (!token) return;

      const { data } = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ดักจับข้อมูลทุกรูปแบบที่ Backend อาจส่งมาเพื่อให้ตารางซิงค์
      const finalData = Array.isArray(data) ? data : (data.orders || data.data || []);
      setOrders(finalData);
      setLoading(false);
    } catch (error) {
      console.error("Fetch orders fail", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    document.body.style.backgroundColor = "#FFF8EE";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

  // 2. ฟังก์ชันอัปเดตสถานะ (เชื่อมกับ PUT /api/orders/:id/status)
  const updateStatus = async (orderId, newStatus) => {
    try {
      const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
      const userInfo = JSON.parse(storedUser);
      const token = userInfo?.token || userInfo?.data?.token || userInfo;

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("อัปเดตสถานะสำเร็จ!");
      fetchOrders(); 
    } catch (error) {
      alert("อัปเดตไม่สำเร็จ: " + (error.response?.data?.message || "Error"));
    }
  };

  // const deleteOrder = async (orderId) => {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending": return "bg-orange-100 text-orange-600 border-orange-200";
      case "paid": return "bg-blue-100 text-blue-600 border-blue-200";
      case "delivered": return "bg-green-100 text-green-600 border-green-200";
      case "cancelled": return "bg-red-100 text-red-600 border-red-200";
      default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  // ฟังก์ชันเปิด Modal
  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (loading) return <div className="p-10 text-center font-bold">กำลังโหลด...</div>;

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 min-h-screen">
      <aside className="w-full md:w-52 bg-[#ffeecb] p-3 h-fit mt-16 rounded-xl shadow-md self-start">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Products</h2>
        <ul className="space-y-2">
          <li>
             <button onClick={() => navigate("/admin/products/add")} className="p-2 rounded text-left hover:bg-white/30 w-full hover:text-orange-500 font-semibold">
              Add Products
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/products")} className="flex gap-3 items-center p-2 rounded hover:bg-white/30 w-full hover:text-indigo-500 font-semibold ">
              Manage List
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/update/orders")} className="flex gap-3 items-center p-2 rounded bg-sky-400/40 w-full text-red-700 font-semibold ">
              Order Status
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content  */}
      <main className="flex-1 p-4">
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Order Management</h3>
          <div className="overflow-x-auto rounded-lg shadow-inner">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                  <th className="p-4 border-b">Order ID / Customer</th>
                  <th className="p-4 border-b text-center">Date</th>
                  <th className="p-4 border-b">Total Price</th>
                  <th className="p-4 border-b text-center">Status</th>
                  <th className="p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => openOrderDetail(order)}>
                    <td className="p-4 border-b">
                      <div className="font-bold text-indigo-600 underline">#{order._id.slice(-6).toUpperCase()}</div>
                      <div className="text-sm font-semibold">{order.user?.name || "ลูกค้าทั่วไป"}</div>
                    </td>
                    <td className="p-4 border-b text-center">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("th-TH") : "-"}</td>
                    <td className="p-4 border-b font-bold text-orange-600">
                       ฿{(order.totalPrice || order.total || order.amount || 0).toLocaleString()}
                    </td>
                    <td className="p-4 border-b text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black border ${getStatusColor(order.status)}`}>{(order.status || "pending").toUpperCase()}</span>
                    </td>
                    <td className="p-4 border-b" onClick={(e) => e.stopPropagation()}>
                      <select className="p-1.5 text-xs border rounded-lg font-bold" value={order.status || "pending"} onChange={(e) => updateStatus(order._id, e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="paid">paid</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 🟢 Popup Modal รายละเอียด  */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-[#ffeecb] p-4 flex justify-between items-center border-b">
              <h4 className="text-xl font-bold text-black">รายละเอียดออเดอร์ #{selectedOrder._id.toUpperCase()}</h4>
              <button onClick={() => setShowModal(false)} className="text-2xl font-bold hover:text-red-500 transition-colors">&times;</button>
            </div>
            
            {/* Body - จุดที่ให้ซิงค์ */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="font-bold text-gray-400 uppercase text-[10px] mb-1">ข้อมูลลูกค้า</h5>
                  <p className="font-bold text-lg text-gray-800">{selectedOrder.user?.name || "ไม่ระบุชื่อ"}</p>
                  <p className="text-gray-500 text-sm">{selectedOrder.user?.email || ""}</p>
                </div>
                <div>
                  <h5 className="font-bold text-gray-400 uppercase text-[10px] mb-1">ที่อยู่จัดส่ง</h5>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border">
                    {selectedOrder.shippingAddress 
                      ? `${selectedOrder.shippingAddress.address || ''} ${selectedOrder.shippingAddress.city || ''} ${selectedOrder.shippingAddress.postalCode || ''}`
                      : selectedOrder.address || "ไม่ได้ระบุที่อยู่จัดส่ง"}
                  </p>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-gray-400 uppercase text-[10px] mb-3 border-b pb-1">รายการสินค้า</h5>
                <div className="space-y-3">
                  {/* 🔥 แก้ไขให้วนลูปจากทุกชื่อตัวแปรที่อาจจะเป็นไปได้ */}
                  {(selectedOrder.orderItems || selectedOrder.items || selectedOrder.cartItems || []).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:border-indigo-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image || item.product?.image || "https://via.placeholder.com/150"} 
                            alt="" className="w-full h-full object-cover" 
                          />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{item.name || item.product?.name || "สินค้าไม่มีชื่อ"}</p>
                          <p className="text-xs text-gray-500 font-medium">จำนวน: {item.qty || item.quantity || 1}</p>
                        </div>
                      </div>
                      <p className="font-bold text-indigo-600">
                        ฿{((item.price || 0) * (item.qty || item.quantity || 1)).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
              <div className="text-right flex flex-col">
                <span className="text-gray-400 text-[10px] font-bold uppercase">ยอดรวมทั้งหมด</span>
                <span className="text-2xl font-black text-orange-600">
                   ฿{(selectedOrder.totalPrice || selectedOrder.total || selectedOrder.amount || 0).toLocaleString()}
                </span>
              </div>
              <button onClick={() => setShowModal(false)} className="bg-gray-800 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-black transition-all">ปิดหน้าต่าง</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};