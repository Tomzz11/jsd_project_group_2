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

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth() // ✅ ใช้ login จาก AuthContext
  const { syncCartOnLogin } = useCart()
  
  const from = location.state?.from?.pathname || "/"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // ✅ ใช้ login function จาก AuthContext
      const result = await login(email, password)

      if (result.success) {
        // ✅ Sync cart จาก localStorage ไป Database
        try {
          await syncCartOnLogin()
          console.log("Cart synced successfully")
        } catch (cartError) {
          console.error("Cart sync error:", cartError)
          // ไม่ให้ cart sync error ขัดขวาง login
        }

        console.log("Login successful")

        // Navigate to destination
        navigate(from, { replace: true })
      } else {
        setError(result.message || "เข้าสู่ระบบไม่สำเร็จ")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="absolute inset-0 z-0 flex min-h-screen items-center justify-center gap-5 bg-center p-4"
      style={{ backgroundImage: "url('/ryan-walton-AbNO2iejoXA-unsplash.jpg')" }}
    >
      {/* Info Card */}
      <Card className="w-80">
        <CardContent></CardContent>
        <CardHeader>
          <CardTitle>Email สำหรับเข้าสู่ระบบ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div>
              <p className="font-bold">For User</p>
              <p>Email: user@maipaws.com</p>
              <p>Password: 123456</p>
            </div>
            <div className="mt-3">
              <p className="font-bold">For Admin</p>
              <p>Email: admin@maipaws.com</p>
              <p>Password: 123456</p>
            </div>
          </div>
          <CardDescription className="mt-4 text-red-500">
            สามารถ sign up ใหม่โดยกำหนด email และ password เพื่อเข้าสู่ระบบทดสอบได้
          </CardDescription>
        </CardContent>
      </Card>

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

export default Login