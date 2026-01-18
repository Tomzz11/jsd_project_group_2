import React from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { isAuthed, getCurrentUser, logoutMock } from "@/lib/auth"

const Navbar = ({ fixed = false, transparent = false }) => {
  const navigate = useNavigate()
  const authed = isAuthed()
  const user = getCurrentUser()

  const handleLogout = () => {
    logoutMock()
    navigate("/login", { replace: true })
  }

    const base = "z-50 h-20 flex items-center justify-between px-10 transition-all duration-300";

  const position = fixed
    ? "fixed top-0 left-0 right-0 "
    : "relative"; // หรือ "sticky top-0" ถ้าอยากให้ติดบนตอน scroll

  const skin = transparent
    ? "bg-transparent text-white"
    : "bg-white/70 backdrop-blur-md shadow-sm text-gray-900";

  return (
       <nav className={`${base} ${position} ${skin}`}>
      {/* Left */}
      <div className=" flex items-center gap-2 ">
        <Link to="/">
          <img className="h-20 w-20 pt-3.5" src="IMG_8372.png" alt="" />
        </Link>
      </div>

      {/* Right */}
      <div className="relative z-10 flex gap-4">
        <ul className="relative z-10 flex gap-10 text-xl font-semibold items-center bg-white/60 backdrop-blur-md shadow-sm
                 rounded-full px-6 py-3 text-gray-900">
          <li className="hover:text-blue-600 rounded-full">
            <Link to="/">
              <i className="bx bx-home"></i>
            </Link>
          </li>

          {/* user icon */}
          <li className="hover:text-blue-600 rounded-full ">
            <Link to={authed ? "/dashboard" : "/login"}>
              <i className="bx bx-user"></i>
            </Link>
          </li>


          {/* admin only */}
          {user?.role === "admin" && (
            <li className="hover:text-blue-600 rounded-full">
              <Link to="AdminProducts">
                <i className="bx bx-key"></i>
              </Link>
            </li>
          )}

          <li className="relative hover:text-blue-600 rounded-full">
            <Link to={authed ? "/Cart" : "/login"}>
              <i className="bx bx-cart-alt"></i>
              <span className="absolute -top-2 -right-2 text-xs bg-orange-400 text-white rounded-full px-1">
                50
              </span>
            </Link>
          </li>

          {/* ✅ SHOW ONLY WHEN LOGIN */}
          {authed && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.profile?.displayName || "My Account"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  Orders
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
