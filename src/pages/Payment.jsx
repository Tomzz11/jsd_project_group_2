import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderAPI, addressAPI } from "@/services/api";

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("promptpay");
  const [submitting, setSubmitting] = useState(false);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. คำนวณข้อมูลตะกร้าในที่เดียว
  const { orderItems, totalPrice } = useMemo(() => {
    const items = (cartItems || []).map(i => ({
      productId: i.productId || i.product?._id || i._id,
      name: i.name || i.product?.name || "Product",
      price: Number(i.price ?? i.product?.price ?? 0),
      quantity: Number(i.quantity ?? 0),
    }));
    return {
      orderItems: items,
      totalPrice: items.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    };
  }, [cartItems]);

  // 2. ดึงที่อยู่เริ่มต้น
  useEffect(() => {
    addressAPI.getAll().then(res => {
      const addr = res.data?.data?.find(a => a.isDefault);
      setAddress(addr || null);
    }).finally(() => setLoading(false));
  }, []);

  const handleConfirm = async () => {
    if (!user) return navigate("/login", { state: { from: "/payment" } });
    if (!address || orderItems.length === 0) return;

    try {
      setSubmitting(true);
      const res = await orderAPI.create({
        items: orderItems.map(({productId, quantity}) => ({productId, quantity})),
        shippingAddress: { ...address },
      });
      if (res.data?.success) {
        await clearCart();
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:pt-10 space-y-6">
      <h1 className="bg-black text-white text-2xl font-bold p-4 rounded-xl text-center shadow-md">Payment</h1>

      <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl shadow-sm border">
        {/* สรุปคำสั่งซื้อ */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2">รายการสั่งซื้อ</h3>
          {orderItems.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="flex-1 truncate mr-2">{item.name} x {item.quantity}</span>
              <span className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="pt-4 border-t flex justify-between items-center text-xl font-bold">
            <span>รวมทั้งสิ้น</span>
            <span className="text-green-600">฿{totalPrice.toLocaleString()}</span>
          </div>
        </section>

        {/* ที่อยู่และการชำระเงิน */}
        <section className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
            <h3 className="font-bold mb-2">📍 ที่อยู่จัดส่ง</h3>
            {loading ? <p className="text-sm text-gray-400">กำลังโหลด...</p> : address ? (
              <div className="text-sm text-gray-600">
                <p className="font-medium text-black">{address.name || user?.name}</p>
                <p>{address.address}, {address.city}, {address.postalCode}</p>
                <p>โทร: {address.phone}</p>
              </div>
            ) : <p className="text-red-500 text-sm">⚠️ ยังไม่ได้เลือกที่อยู่</p>}
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">ช่องทางชำระเงิน</h3>
            {['promptpay', 'card'].map(method => (
              <button key={method} onClick={() => setSelectedMethod(method)}
                className={`w-full flex items-center p-3 border-2 rounded-xl transition-all ${selectedMethod === method ? 'border-black bg-gray-50' : 'border-gray-100 text-gray-400'}`}>
                <span className="text-2xl mr-3">{method === 'promptpay' ? '📱' : '💳'}</span>
                <span className="text-sm font-bold uppercase">{method}</span>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={() => navigate(-1)} className="flex-1 py-3 border rounded-xl hover:bg-gray-50">ย้อนกลับ</button>
            <button onClick={handleConfirm} disabled={submitting || !address || !orderItems.length}
              className="flex-[2] py-3 bg-black text-white font-bold rounded-xl disabled:bg-gray-300 active:scale-95 transition-all">
              {submitting ? "กำลังประมวลผล..." : "ยืนยันการชำระเงิน"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;