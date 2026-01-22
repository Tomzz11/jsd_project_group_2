import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { toast } from "sonner"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth() //  ใช้ login จาก AuthContext
  const { syncCartOnLogin, clearCart } = useCart()
  
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // ใช้ login function จาก AuthContext
      const result = await login(email, password)

      if (result.success) {
        const userData = result.data;

        // Toast แจ้งเตือน Login สำเร็จ
        toast.success(`ยินดีต้อนรับ ${userData.name}! 🎉`, {
          description:
            userData.role === "admin"
              ? "คุณเข้าสู่ระบบในฐานะ Admin"
              : "เข้าสู่ระบบสำเร็จ",
        });

        // ถ้าเป็น Admin ไม่ต้อง sync cart และไปหน้า admin
        if (userData.role === "admin") {
          await clearCart();
          navigate("/admin/products", { replace: true });
        } else {    
          //Sync cart สำหรับ User เท่านั้น      
          try {
            await syncCartOnLogin()
        } catch (cartError) {
            console.error("Cart sync error:", cartError)
        }
        // Navigate to destination
            navigate(from, { replace: true })
        }
      } else {
        setError(result.message || "เข้าสู่ระบบไม่สำเร็จ");
        toast.error("เข้าสู่ระบบไม่สำเร็จ", {
          description: result.message,
        });
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง");
      toast.error("เกิดข้อผิดพลาด", {
        description: "กรุณาลองใหม่อีกครั้ง",
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="absolute inset-0 z-0 flex min-h-screen items-center justify-center gap-5 bg-center p-4"
      style={{ backgroundImage: "url('/ryan-walton-AbNO2iejoXA-unsplash.jpg')" }}
    >

      {/* Login Form Card */}
      <Card className="h-[480px] w-[490px]">
        <CardHeader className="mt-15 text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="rounded bg-red-50 p-3 text-center text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@maipaws.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:text-blue-700"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-5">
          <Link to="/register" className="w-full">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login;

