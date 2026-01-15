import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// --- 1. Import ข้อมูลจากไฟล์ product.js ---
import { products } from "../components/mockdata/products.js"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // 2. ดึงข้อมูลจาก Local Storage (มี id และ quantity)
    const productlist = JSON.parse(localStorage.getItem("productSelectedList")) || [];

    // 3. นำข้อมูลจาก Local Storage มา Map เข้ากับข้อมูลจากไฟล์ product.js
    const selectedProducts = productlist.map(item => {
      // หาข้อมูลสินค้าตัวเต็มที่มี ID ตรงกับใน Local Storage
      const productDetail = products.find(p => p.id === item.id);
      
      if (productDetail) {
        return {
          ...productDetail,
          quantity: item.quantity // นำจำนวนจาก Local Storage มาใส่
        };
      }
      return null;
    }).filter(item => item !== null); // กรองทิ้งหากหา ID ในไฟล์ product.js ไม่เจอ

    setCartItems(selectedProducts);
  }, []);

  // 4. คำนวณยอดรวม
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-5xl mx-auto ">
        <h2 className="text-xl font-bold mb-6 px-2">Checkout</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold">Product</TableHead>
              <TableHead className="text-left font-bold">Detail</TableHead>
              <TableHead className="text-center font-bold">Quantity</TableHead>
              <TableHead className="text-center font-bold">Price</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-3xl">
                    {item.emoji}
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-gray-800">{item.name}</div>
                    <div className="text-xs text-gray-500 line-clamp-1">{item.description}</div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {item.quantity}
                  </TableCell>
                  <TableCell className="text-center font-semibold">
                    ฿{(item.price * item.quantity).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-400">
                  ไม่มีสินค้าในตะกร้า
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-bold text-right text-lg">Total Amount</TableCell>
              <TableCell className="text-center font-bold text-xl text-green-600">
                ฿{totalPrice.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="mt-8 flex justify-end px-2">
          <Link
            to="/payment"
            className="bg-black text-white px-10 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-95"
          >
            Confirm Pay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;