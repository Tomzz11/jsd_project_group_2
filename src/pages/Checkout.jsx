import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"

const Checkout = () => {
  
  const cartItems = [
    { id: 1, name: 'pet dog', description: 'สุนัขพันธุ์เล็กนิสัยดี', price: 100 },
    { id: 2, name: 'pet cat', description: 'แมวขี้อ้อนเลี้ยงง่าย', price: 200 },
   
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-gray-50 ">
      <div className="bg-white p-6  rounded-2xl shadow-sm border border-gray-100 w-full max-w-5xl mx-auto ">
  <h2 className="text-xl font-bold mb-6 px-2">Checkout</h2>
      <Table>
  <TableHeader >
    <TableRow>
      <TableHead className="text-center font-bold">Product</TableHead>
      <TableHead className="text-center font-bold">Detail</TableHead>
      <TableHead className="text-center font-bold">ราคา</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    <TableRow>
      <TableCell className="font-medium text-center ">INV001</TableCell>
      <TableCell className="text-center">Credit Card</TableCell>
      <TableCell className="text-center">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium text-center ">INV001</TableCell>
      <TableCell className="text-center">Credit Card</TableCell>
      <TableCell className="text-center">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium text-center ">INV001</TableCell>
      <TableCell className="text-center">Credit Card</TableCell>
      <TableCell className="text-center">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium text-center ">INV001</TableCell>
      <TableCell className="text-center">Credit Card</TableCell>
      <TableCell className="text-center">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium text-center ">INV001</TableCell>
      <TableCell className="text-center">Credit Card</TableCell>
      <TableCell className="text-center">$250.00</TableCell>
    </TableRow>
    
  </TableBody>
  <TableFooter>
        <TableRow>
      <TableCell className="font-bold text-center ">total</TableCell>
      <TableCell className="text-center"></TableCell>
      <TableCell className="text-center">$250.00</TableCell>
    </TableRow>
      </TableFooter>
</Table>

</div>
      </div>
     
    </>
  );
};

export default Checkout;