import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav
      className="relative z-20 h-20 flex items-center justify-between px-10
                 "
    >
      {/* Left */}
      <div className="relative z-10 flex items-center gap-2">
        <Link to="/">
          <img className=" h-20 w-20 pt-3.5" src="IMG_8372.png" alt="" />
        </Link>
      </div>

      {/* Center */}
      

      {/* Right */}
      <div className="relative z-10 flex gap-4">
        <ul className="relative z-10 flex gap-10 text-xl font-semibold">
          <li className="hover:text-blue-500">
            <Link to="/">
              <i class="bx  bx-home"></i>{" "}
            </Link>
          </li>
          <li className="hover:text-blue-500">
            <Link to="UserDashboard">
              <i class="bx  bx-user"></i>{" "}
            </Link>
          </li>
          <li className="hover:text-blue-500">
            <a href="">
              <i class="bx  bx-heart"></i>{" "}
            </a>
          </li>
          <li className="hover:text-blue-500">
            <Link to="AdminProducts"><i class='bx  bx-key'></i> </Link>
          </li>
          <li className="relative hover:text-blue-500">
            <Link to="Cart">
              <i class="bx  bx-cart-alt"></i>
              <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
                50 {/* ไว้สำหรับแจ้งเตือนจำนวนสินค้าในตระก้า */}
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar