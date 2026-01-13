import React from 'react';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Layout from './pages/Layout';
import UserDashboard from './components/dashboard/UserDashboard';
import OrderHistory  from './pages/OrderHistory';
import Checkout from './pages/Checkout';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <Home /> ,},
      {path:"Cart", element: <Cart />},
      {path:"Products", element: <Products />},
      {path:"UserDashboard", element: <UserDashboard />},
      {path:"OrderHistory", element:<OrderHistory/>},
      {path:"Checkout", element:<Checkout/>},

    ]
  }
]);






function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

