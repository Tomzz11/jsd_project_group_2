// components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // ✅ รอให้ loading เสร็จก่อน
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ✅ เช็คว่า login หรือยัง
  if (!user) {
    // Redirect ไป login พร้อมบันทึก path ที่พยายามเข้า
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ✅ เช็คว่าต้องการสิทธิ์ admin หรือไม่
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // ✅ ผ่านการตรวจสอบแล้ว
  return <Outlet />;
};

export default ProtectedRoute;