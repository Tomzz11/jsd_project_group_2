import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
        <nav
            className="relative z-20 h-20 flex items-center justify-between px-10
                bg-pink-100/70 backdrop-blur-sm shadow-sm"
          >
            {/* Left */}
            <div className="relative z-10 flex items-center gap-2">
              <img className=" h-30 w-30 pt-3.5" src="IMG_8372.png" alt="" />
            </div>

            {/* Center */}
            <ul className="relative z-10 flex gap-6">
              <li className="text-orange-400">
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Shop</a>
              </li>
              <li>
                <a href="">Contact</a>
              </li>
            </ul>

            {/* Right */}
            <div className="relative z-10 flex gap-4">
              <span>
                <a href="">🐬</a>
              </span>
              <span>
                <a href="">❤️</a>
              </span>
              <span className="relative">
                <Link to="Cart">
                  🛒
                  <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
                    {/* ไว้สำหรับแจ้งเตือนจำนวนสินค้าในตระก้า */}
                  </span>
                </Link>
              </span>
            </div>
          </nav>
  )
}

export default Navbar