import Navbar from '@/components/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Cursor from '@/components/Cursor'
  const Layout = () => {
  return (
    <div>
         <Cursor />
        <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout