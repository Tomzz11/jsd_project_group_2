import React from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

const Navbar = ({ fixed = false, transparent = false }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth() // ✅ ใช้ AuthContext
  const { cartCount, syncCartOnLogout } = useCart() // ✅ ใช้ CartContext

  const handleLogout = async () => {
    try {
      // ✅ Sync cart ก่อน logout
      await syncCartOnLogout()
      logout()
      navigate("/login", { replace: true })
    } catch (error) {
      console.error("Logout error:", error)
      logout()
      navigate("/login", { replace: true })
    }
  }

  // ✅ ตรวจสอบว่าอยู่หน้า Home หรือไม่
  const isHomePage = location.pathname === "/"

  const base = "z-50 h-20 flex items-center justify-between px-10 transition-all duration-300"
  
  const position = isHomePage 
    ? "absolute top-0 left-0 right-0" 
    : fixed 
      ? "fixed top-0 left-0 right-0"
      : "relative"

  const skin = isHomePage || transparent
    ? "bg-transparent text-white"
    : "bg-white/70 backdrop-blur-md shadow-sm text-gray-900"

  return (
    <nav className={`${base} ${position} ${skin}`}>
      {/* Left */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img className="h-20 w-20 pt-3.5" src="/IMG_8372.png" alt="MaiPaws Logo" />
        </Link>
      </div>

      {/* Right */}
      <div className="relative z-10 flex gap-4">
        <ul 
          className={`relative z-10 flex gap-10 text-xl font-semibold items-center rounded-full px-6 py-3 ${
            isHomePage || transparent
              ? "bg-white/20 backdrop-blur-md shadow-sm text-gray-900"
              : "bg-white/60 backdrop-blur-md shadow-sm text-gray-900"
          }`}
        >
          <li className="hover:text-blue-600 rounded-full">
            <Link to="/">
              <i className="bx bx-home"></i>
            </Link>
          </li>

          {/* Products */}
          <li className="hover:text-blue-600 rounded-full">
            <Link to="/products">
              <i className="bx bx-shopping-bag"></i>
            </Link>
          </li>

          {/* user icon */}
          <li className="hover:text-blue-600 rounded-full">
            <Link to={user ? "/dashboard" : "/login"}>
              <i className="bx bx-user"></i>
            </Link>
          </li>

          {/* admin only */}
          {user?.role === "admin" && (
            <li className="hover:text-blue-600 rounded-full">
              <Link to="/admin/products">
                <i className="bx bx-key"></i>
              </Link>
            </li>
          )}

          {/* Cart with count badge */}
          <li className="relative hover:text-blue-600 rounded-full">
            <Link to={user ? "/cart" : "/login"}>
              <i className="bx bx-cart-alt"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-xs text-white">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
          </li>

          {/* ✅ SHOW ONLY WHEN LOGIN */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {user?.name || user?.email || "My Account"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <i className="bx bx-user mr-2"></i>
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <i className="bx bx-shopping-bag mr-2"></i>
                  Orders
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/cart")}>
                  <i className="bx bx-cart mr-2"></i>
                  Cart
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-500 focus:text-red-500"
                  onClick={handleLogout}
                >
                  <i className="bx bx-log-out mr-2"></i>
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