import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";

const Layout = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div>
      <Cursor />

      {/* ✅ Home: fixed + transparent | หน้าอื่น: relative + bg */}
      <Navbar fixed={isHome} transparent={isHome} />

      {/* ✅ กัน Navbar fixed ทับ content เฉพาะหน้า Home */}
      <div className={isHome ? "pt-20" : ""}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;