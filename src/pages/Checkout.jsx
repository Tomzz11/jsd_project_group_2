import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

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
  const { cartItems, getTotalPrice, loading } = useCart();

  const totalPrice = getTotalPrice();

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-5xl mx-auto">
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
                <TableRow key={item.productId || item._id || item.product}>
                  <TableCell className="text-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="mx-auto h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="text-3xl">📦</div>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="font-bold text-gray-800">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-gray-500 line-clamp-1">
                        {item.description}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className="text-center font-medium">
                    {item.quantity}
                  </TableCell>

                  <TableCell className="text-center font-semibold">
                    ฿{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
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
              <TableCell colSpan={3} className="font-bold text-right text-lg">
                Total Amount
              </TableCell>
              <TableCell className="text-center font-bold text-xl text-green-600">
                ฿{totalPrice.toLocaleString()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="mt-8 flex justify-end px-2">
          <Link
            to="/payment"
            className={`bg-black text-white px-10 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-md active:scale-95 ${
              cartItems.length === 0 ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Confirm Pay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
