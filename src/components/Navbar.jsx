import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const Navbar = ({ fixed = false, transparent = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();
  const { cartCount, syncCartOnLogout } = useCart();

  const handleLogout = async () => {
    try {
      await syncCartOnLogout();
      logout();
      toast.success("ออกจากระบบสำเร็จ", {
        description: "แล้วพบกันใหม่!",
      });
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      logout();
      navigate("/login", { replace: true });
    }
  };

  // ✅ เมื่อกด icon ที่ต้อง login
  const handleProtectedClick = (path) => {
    if (!user) {
      toast.error("กรุณาเข้าสู่ระบบ");
      navigate("/login", { state: { from: location } });
      return;
    }
    navigate(path);
  };

  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  const base =
    "z-50 h-20 flex items-center justify-between px-10 transition-all duration-300";

  const position = isHomePage
    ? "absolute top-0 left-0 right-0"
    : fixed
    ? "fixed top-0 left-0 right-0"
    : "relative";

  const skin =
    isHomePage || transparent
      ? "bg-transparent text-white"
      : "bg-white/70 backdrop-blur-md shadow-sm text-gray-900";

  // ✅ Navbar สำหรับ Admin (เมื่ออยู่ในหน้า Admin)
  if (isAdmin && isAdminPage) {
    return (
      <nav className={`${base} ${position} ${skin}`}>
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <Link to="/">
            <img
              className="h-20 w-20 pt-3.5"
              src="/IMG_8372.png"
              alt="MaiPaws Logo"
            />
          </Link>
        </div>

        {/* Right - Admin Menu */}
        <div className="relative z-10 flex gap-4">
          <ul
            className={`relative z-10 flex gap-10 text-xl font-semibold items-center rounded-full px-6 py-3 ${
              isHomePage || transparent
                ? "bg-white/20 backdrop-blur-md shadow-sm text-gray-900"
                : "bg-white/60 backdrop-blur-md shadow-sm text-gray-900"
            }`}
          >
            {/* Home */}
            <li className="hover:text-blue-600 rounded-full">
              <Link to="/">
                <i className="bx bx-home"></i>
              </Link>
            </li>

            {/* Products (View) */}
            <li className="hover:text-blue-600 rounded-full">
              <Link to="/products">
                <i className="bx bx-shopping-bag"></i>
              </Link>
            </li>

            {/* Admin Panel */}
            <li className="hover:text-blue-600 rounded-full">
              <Link to="/admin/products">
                <i className="bx bx-key"></i>
              </Link>
            </li>

            {/* Admin Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  👑 {user?.name || "Admin"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={() => navigate("/admin/products/add")}
                >
                  <i className="bx bx-plus mr-2"></i>
                  Add Product
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate("/admin/products")}>
                  <i className="bx bx-list-ul mr-2"></i>
                  Manage Lists
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate("/admin/update/orders")}
                >
                  <i className="bx bx-receipt mr-2"></i>
                  Order Status
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
          </ul>
        </div>
      </nav>
    );
  }

  // ✅ Navbar สำหรับ User ทั่วไป และ Guest
  return (
    <nav className={`${base} ${position} ${skin}`}>
      {/* Left */}
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            className="h-20 w-20 pt-3.5"
            src="/IMG_8372.png"
            alt="MaiPaws Logo"
          />
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
          {/* Home */}
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

          {/* User Dashboard (ไม่แสดงสำหรับ Admin) */}
          {!isAdmin && (
            <li className="hover:text-blue-600 rounded-full">
              <button onClick={() => handleProtectedClick("/dashboard")}>
                <i className="bx bx-user"></i>
              </button>
            </li>
          )}

          {/* Admin Key (สำหรับ Admin เท่านั้น) */}
          {isAdmin && (
            <li className="hover:text-blue-600 rounded-full">
              <Link to="/admin/products">
                <i className="bx bx-key"></i>
              </Link>
            </li>
          )}

          {/* Cart (ไม่แสดงสำหรับ Admin) */}
          {!isAdmin && (
            <li className="relative hover:text-blue-600 rounded-full">
              <button onClick={() => handleProtectedClick("/cart")}>
                <i className="bx bx-cart-alt"></i>
                {/* ✅ แสดง badge เฉพาะเมื่อ login แล้วและมีสินค้า */}
                {user && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-xs text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
            </li>
          )}

          {/* User Menu (เมื่อ Login แล้ว) */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <i className="bx bx-dots-horizontal-rounded"></i>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {isAdmin ? "👑 " : ""}
                  {user?.name || user?.email || "My Account"}
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Admin: แสดง Admin Panel */}
                {isAdmin ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/products")}
                    >
                      <i className="bx bx-package mr-2"></i>
                      Admin Panel
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    {/* User: แสดง Profile, Orders, Cart */}
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
                  </>
                )}

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
          ) : (
            // ✅ Guest: แสดงปุ่ม Login
            <li className="hover:text-blue-600 rounded-full">
              <Link to="/login">
                <i className="bx bx-log-in"></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



