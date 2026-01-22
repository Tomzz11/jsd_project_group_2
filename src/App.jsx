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
import { UpdateStatus } from "./pages/UpdateStatus";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // หน้าสาธารณะ
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      // ✅ หน้าที่ต้อง login และเป็น User เท่านั้น
      {
        element: <ProtectedRoute requireUser={true} />,
        children: [
          {
            path: "cart",
            element: <Cart />,
          },
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

      // ✅ หน้า Admin
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
          {
            path: "admin/update/orders",
            element: <UpdateStatus />,
          },
        ],
      },
    ],
  },
]);


function App() {
  return <>
  <Toaster 
  position="top-right" 
  richColors 
  duration={1700}
  />
  <RouterProvider router={router} />
  </>
}
  
export default App;
