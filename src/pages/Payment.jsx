import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../components/mockdata/products.js"

const Payment = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState("promptpay");

  // ดึงข้อมูลจาก Local Storage และจัดการข้อมูลสินค้า
  const [orderSummary] = useState(() => {
    const productlist = JSON.parse(localStorage.getItem("productSelectedList")) || [];
    
    const items = productlist.map(item => {
      const productDetail = products.find(p => p.id === item.id);
      return productDetail 
        ? { 
            name: productDetail.name, 
            price: productDetail.price, 
            quantity: item.quantity,
            totalLinePrice: productDetail.price * item.quantity 
          } 
        : null;
    }).filter(item => item !== null);

    const total = items.reduce((acc, item) => acc + item.totalLinePrice, 0);

    return { items, total };
  });

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
              
              {/* Left Side: Order Summary พร้อมหัวข้อ Product, Quantity, Price */}
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2 text-black">
                  รายการคำสั่งซื้อ
                </h3>
                
                {/* Table Header สำหรับ Mobile/Desktop */}
                <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
                  <span className="w-1/2">Product</span>
                  <span className="w-1/4 text-center">Quantity</span>
                  <span className="w-1/4 text-right">Price</span>
                </div>

                <div className="space-y-4">
                  {orderSummary.items.length > 0 ? (
                    orderSummary.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start text-gray-600 text-sm border-b border-gray-50 pb-3"
                      >
                        {/* Product Name */}
                        <span className="w-1/2 pr-2 font-medium text-gray-800 line-clamp-2">
                          {item.name}
                        </span>
                        {/* Quantity */}
                        <span className="w-1/4 text-center">
                          {item.quantity}
                        </span>
                        {/* Price (Total for this item) */}
                        <span className="w-1/4 text-right font-semibold text-gray-900">
                          ฿{item.totalLinePrice.toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-gray-400">ไม่มีรายการสินค้า</p>
                  )}
                  
                  {/* Total Section */}
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
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedMethod === "promptpay" ? "border-black bg-gray-50" : "border-gray-100 hover:bg-gray-50 text-gray-400"}`}>
                    <input type="radio" name="payment" className="hidden" checked={selectedMethod === "promptpay"} onChange={() => setSelectedMethod("promptpay")} />
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${selectedMethod === "promptpay" ? "" : "grayscale"}`}>📱</span>
                      <div>
                        <p className={`font-bold text-sm ${selectedMethod === "promptpay" ? "text-black" : "text-gray-400"}`}>PromptPay / QR Code</p>
                        <p className="text-xs text-gray-400">สแกนผ่านแอปธนาคาร</p>
                      </div>
                    </div>
                  </label>

                  {/* Credit Card */}
                  <label className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedMethod === "card" ? "border-black bg-gray-50" : "border-gray-100 hover:bg-gray-50 text-gray-400"}`}>
                    <input type="radio" name="payment" className="hidden" checked={selectedMethod === "card"} onChange={() => setSelectedMethod("card")} />
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${selectedMethod === "card" ? "" : "grayscale"}`}>💳</span>
                      <div>
                        <p className={`font-bold text-sm ${selectedMethod === "card" ? "text-black" : "text-gray-400"}`}>Credit / Debit Card</p>
                        <p className="text-xs text-gray-400">ชำระผ่านบัตรเครดิต</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col md:flex-row justify-end gap-4 border-t pt-6">
              <button onClick={() => navigate(-1)} className="px-8 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium text-gray-600 transition-all">
                ย้อนกลับ
              </button>
              <button 
                className="px-10 py-2.5 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-95 disabled:bg-gray-300"
                disabled={orderSummary.items.length === 0}
              >
                ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;