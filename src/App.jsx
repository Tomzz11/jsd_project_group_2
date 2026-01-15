import React from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Layout from "./pages/Layout"
import UserDashboard from "./components/dashboard/UserDashboard"
import OrderHistory from "./pages/OrderHistory"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Payment from "./pages/Payment"
import { AdminProducts } from "./pages/AdminProducts"
import AddProduct from "./pages/AddProduct"

import ProtectedRoute from "./components/ProtectedRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "Cart", element: <Cart /> },
      { path: "Products", element: <Products /> },
      { path: "Productdetail", element: <ProductDetail /> },

      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ✅ กลุ่มที่ต้องล็อกอินก่อน
      {
        element: <ProtectedRoute />,
        children: [
          { path: "UserDashboard", element: <UserDashboard /> },
          { path: "OrderHistory", element: <OrderHistory /> },
          { path: "Checkout", element: <Checkout /> },
          { path: "Payment", element: <Payment /> },

          // ถ้าต้องการให้ admin ก็ล็อกอินก่อนด้วย (อย่างน้อยกันคนหลุดเข้ามา)
          { path: "AdminProducts", element: <AdminProducts /> },
          { path: "add-product", element: <AddProduct /> },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
