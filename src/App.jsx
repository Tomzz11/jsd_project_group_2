import React from 'react';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Layout from './pages/Layout';
import UserDashboard from './components/dashboard/UserDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/", element: <Home /> ,},
      {path:"Cart", element: <Cart />},
      {path:"Products", element: <Products />},
      {path:"UserDashboard", element: <UserDashboard />}

    ]
  }
]);






function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;

