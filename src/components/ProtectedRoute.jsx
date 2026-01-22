// components/ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requireAdmin = false, requireUser = false }) => {
  const { user, loading, isAdmin } = useAuth();
  const location = useLocation();

    if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // เช็คว่า login หรือยัง
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ถ้าต้องการสิทธิ์ Admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ถ้าต้องการเป็น User เท่านั้น (ไม่ใช่ Admin)
  if (requireUser && isAdmin) {
    return <Navigate to="/admin/products" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;