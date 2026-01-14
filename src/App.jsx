import React from 'react';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Layout from './pages/Layout';
import UserDashboard from './components/dashboard/UserDashboard';
import OrderHistory from './pages/OrderHistory';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <Home />},
      {path: "Cart", element: <Cart />},
      {path: "Products", element: <Products />},
      {path: "Productdetail", element: <ProductDetail />},
      {path: "UserDashboard", element: <UserDashboard />},
      {path: "OrderHistory", element: <OrderHistory />},
      {path: "Checkout", element: <Checkout />},
      {path: "Payment", element: <Payment />},
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;