import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderAPI } from "@/services/api";
import { addressAPI } from "@/services/api";

const Payment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart,  } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("promptpay");
  const [submitting, setSubmitting] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  // ✅ แปลง cartItems -> items ที่ backend ต้องการ
  const itemsForOrder = useMemo(() => {
    return (cartItems || []).map((item) => ({
      productId:
        item.productId || item.product?._id || item.product || item._id,
      quantity: item.quantity,
    }));
  }, [cartItems]);

  const orderSummary = useMemo(() => {
    const items = (cartItems || []).map((item) => {
      const id =
        item.productId || item.product?._id || item.product || item._id;
      const name = item.name || item.product?.name || "Unknown product";
      const price = Number(item.price ?? item.product?.price ?? 0);
      const quantity = Number(item.quantity ?? 0);

      return {
        id,
        name,
        price,
        quantity,
        totalLinePrice: price * quantity,
      };
    });

    const total = items.reduce((acc, i) => acc + i.totalLinePrice, 0);

    return { items, total };
  }, [cartItems]);

  useEffect(() => {
    const loadDefaultAddress = async () => {
      try {
        const res = await addressAPI.getAll();
        const list = res.data?.data || [];
        const found = list.find((a) => a.isDefault);
        setDefaultAddress(found || null);
      } catch (err) {
        console.error(err);
        setDefaultAddress(null);
      } finally {
        setAddressLoading(false);
      }
    };

    loadDefaultAddress();
  }, []);

  const shippingAddress = defaultAddress
    ? {
        address: defaultAddress.address,
        city: defaultAddress.city,
        postalCode: defaultAddress.postalCode,
        phone: defaultAddress.phone,
      }
    : null;

  const handleConfirmPayment = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/payment" } });
      return;
    }
    if (itemsForOrder.length === 0) return;

    try {
      setSubmitting(true);

      const payload = {
        items: itemsForOrder,
        shippingAddress, // ส่งไปได้เลย (จะว่างก็ได้)
        // selectedMethod ตอนนี้ backend ยังไม่เก็บ (schema ไม่มี field)
      };

      const res = await orderAPI.create(payload);

      if (res.data?.success) {
        await clearCart(); // ✅ ล้างตะกร้า
        navigate("/dashboard"); // ✅ ไปดูออเดอร์
      } else {
        alert(res.data?.message || "สั่งซื้อไม่สำเร็จ");
      }
    } catch (err) {
      alert(err.response?.data?.message || "เกิดข้อผิดพลาดในการสั่งซื้อ");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-4xl mx-auto pt-10 px-4">
        {/* Header Section */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-black p-4 text-center font-bold text-2xl rounded-xl text-white shadow-sm">
            Payment
          </div>
        </div>

        <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
          <div className="bg-white p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Left Side: Order Summary */}
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-black">
                  รายการคำสั่งซื้อ
                </h3>

                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
                  <span className="w-1/2">Product</span>
                  <span className="w-1/4 text-center">Quantity</span>
                  <span className="w-1/4 text-right">Price</span>
                </div>

                <div className="space-y-4">
                  {orderSummary.items.length > 0 ? (
                    orderSummary.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-start text-gray-600 text-sm border-b border-gray-50 pb-3"
                      >
                        <span className="w-1/2 pr-2 font-medium text-gray-800 line-clamp-2">
                          {item.name}
                        </span>

                        <span className="w-1/4 text-center">
                          {item.quantity}
                        </span>

                        <span className="w-1/4 text-right font-semibold text-gray-900">
                          ฿{item.totalLinePrice.toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-400">
                      ไม่มีรายการสินค้า
                    </p>
                  )}

                  <div className="pt-4 flex justify-between items-center font-bold text-lg text-black">
                    <span>ยอดรวมทั้งสิ้น</span>
                    <span className="text-2xl text-green-600">
                      ฿{orderSummary.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Payment Methods */}
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-black">
                  เลือกวิธีการชำระเงิน
                </h3>

                <div className="space-y-4">
                  {/* PromptPay */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedMethod === "promptpay"
                        ? "border-black bg-gray-50"
                        : "border-gray-100 hover:bg-gray-50 text-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      checked={selectedMethod === "promptpay"}
                      onChange={() => setSelectedMethod("promptpay")}
                    />
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-2xl ${
                          selectedMethod === "promptpay" ? "" : "grayscale"
                        }`}
                      >
                        📱
                      </span>
                      <div>
                        <p
                          className={`font-bold text-sm ${
                            selectedMethod === "promptpay"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        >
                          PromptPay / QR Code
                        </p>
                        <p className="text-xs text-gray-400">
                          สแกนผ่านแอปธนาคาร
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Credit Card */}
                  <label
                    className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedMethod === "card"
                        ? "border-black bg-gray-50"
                        : "border-gray-100 hover:bg-gray-50 text-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      checked={selectedMethod === "card"}
                      onChange={() => setSelectedMethod("card")}
                    />
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-2xl ${
                          selectedMethod === "card" ? "" : "grayscale"
                        }`}
                      >
                        💳
                      </span>
                      <div>
                        <p
                          className={`font-bold text-sm ${
                            selectedMethod === "card"
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        >
                          Credit / Debit Card
                        </p>
                        <p className="text-xs text-gray-400">
                          ชำระผ่านบัตรเครดิต
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col md:flex-row justify-end gap-4 border-t pt-6">
              <button
                onClick={() => navigate(-1)}
                className="px-8 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-gray-600 transition-all"
              >
                ย้อนกลับ
              </button>

              {!addressLoading && !defaultAddress && (
                <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                  ⚠️ กรุณาเพิ่มและเลือกที่อยู่จัดส่งก่อนยืนยันการชำระเงิน
                </div>
              )}

              <button
                onClick={handleConfirmPayment}
                disabled={
                  submitting || itemsForOrder.length === 0 || !defaultAddress
                }
                className="px-10 py-2.5 bg-black text-white font-bold rounded-xl
    hover:bg-gray-800 transition-all shadow-md active:scale-95
    disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {submitting ? "กำลังทำรายการ..." : "ยืนยันการชำระเงิน"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
