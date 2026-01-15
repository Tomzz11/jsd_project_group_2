import { Navigate, Outlet, useLocation } from "react-router-dom"
import { isAuthed } from "../lib/auth"

export default function ProtectedRoute() {
  const location = useLocation()

  if (!isAuthed()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}