import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Layout from "./pages/Layout";
import UserDashboard from "./components/dashboard/UserDashboard";
import OrderHistory from "./pages/OrderHistory";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import { AdminProducts } from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import { Toaster } from 'sonner';
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // ✅ หน้าหลัก
      {
        index: true,
        element: <Home />,
      },

      // ✅ หน้าสาธารณะ (ไม่ต้องล็อกอิน)
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // ✅ หน้าที่ต้องล็อกอินก่อน
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <UserDashboard />,
          },
          {
            path: "orders",
            element: <OrderHistory />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
          {
            path: "payment",
            element: <Payment />,
          },
        ],
      },

      // ✅ หน้า Admin (ควรมี AdminRoute แยก)
      {
        element: <ProtectedRoute requireAdmin={true} />,
        children: [
          {
            path: "admin/products",
            element: <AdminProducts />,
          },
          {
            path: "admin/products/add",
            element: <AddProduct />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <>
  <Toaster position="top-right" richColors />
  <RouterProvider router={router} />;
  </>
}

export default App;
