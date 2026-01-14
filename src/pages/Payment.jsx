import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('promptpay');
  const navigate = useNavigate();

  // ในโปรเจกต์จริงอาจจะดึงจาก Context หรือ State ของตะกร้าสินค้า
  const orderSummary = {
    total: 300,
    items: [
      { name: 'pet dog', price: 100 },
      { name: 'pet cat', price: 200 }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] pb-10">
      <div className="max-w-4xl mx-auto pt-10 px-4">
        
        {/* Header Section */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-[#fde6d2] p-4 text-center font-bold text-2xl rounded shadow-sm">
            Payment
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-[#e5e7eb] p-6 rounded-lg shadow-md">
          <div className="bg-white p-8 rounded-md">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Left Side: Order Summary */}
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2">รายการคำสั่งซื้อ</h3>
                <div className="space-y-3">
                  {orderSummary.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-gray-700">
                      <span>{item.name}</span>
                      <span>{item.price} บาท</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-4 flex justify-between font-bold text-lg">
                    <span>ยอดรวมทั้งสิ้น</span>
                    <span className="text-orange-600">{orderSummary.total} บาท</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Payment Methods */}
              <div>
                <h3 className="text-xl font-bold mb-4 border-b pb-2">เลือกวิธีการชำระเงิน</h3>
                <div className="space-y-4">
                  
                  {/* PromptPay Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'promptpay' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="hidden" 
                      checked={selectedMethod === 'promptpay'} 
                      onChange={() => setSelectedMethod('promptpay')}
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📱</span>
                      <div>
                        <p className="font-bold text-sm md:text-base">PromptPay / QR Code</p>
                        <p className="text-xs text-gray-500">สแกนผ่านแอปธนาคารฟรีค่าธรรมเนียม</p>
                      </div>
                    </div>
                  </label>

                  {/* Credit Card Option */}
                  <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedMethod === 'card' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      className="hidden" 
                      checked={selectedMethod === 'card'} 
                      onChange={() => setSelectedMethod('card')}
                    />
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💳</span>
                      <div>
                        <p className="font-bold text-sm md:text-base">Credit / Debit Card</p>
                        <p className="text-xs text-gray-500">ชำระผ่านบัตรเครดิตหรือเดบิต</p>
                      </div>
                    </div>
                  </label>

                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-10 flex flex-col md:flex-row justify-end gap-4 border-t pt-6">
              <button onClick={() => navigate(-1)} className="px-8 py-2 border border-gray-300 rounded hover:bg-gray-100 font-medium">
                ย้อนกลับ
              </button>
              <button className="px-10 py-2 bg-[#f9b17a] text-black font-bold rounded hover:bg-[#f79d54] transition-colors shadow-md">
                ยืนยันการชำระเงิน
              </button>
            </div>

          </div>
        </div>
        
        <div/>
      </div>
    </div>
  );
};

export default Payment;