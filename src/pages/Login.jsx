import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,  
  CardAction,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { loginMock } from "@/lib/auth"
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [token, setToken] = useState("");

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/UserDashboard"

 const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")
  
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    });
    
    if (response.status === 200) {
      const newToken = response.data.data.token; // ✅ เก็บไว้ในตัวแปร
      
      setToken(newToken); // อัปเดต state
      localStorage.setItem("maipaws_token", newToken); // ✅ ใช้ค่าจากตัวแปร
      
      console.log("Token saved:", newToken);
      
      navigate(from, { replace: true });
    }
  } catch (error) {
    console.error("Fetch error:", error);
    setError("เข้าสู่ระบบไม่สำเร็จ");
  }
}

  return (
    <div
      className="flex min-h-screen gap-5 items-center justify-center p-4 bg-center absolute inset-0 z-0"
      style={{ backgroundImage: "url('/ryan-walton-AbNO2iejoXA-unsplash.jpg')" }}
    >
      <Card className="w-80"> <CardContent></CardContent>
  <CardHeader>
    <CardTitle> Email สำหรับเข้าสู่ระบบ</CardTitle>
  </CardHeader>
  <CardContent>
    
    <p> <p p className="font-bold">For user</p>  user@maipaws.com</p>
    <p>password: 1234</p>
    <p><p className="font-bold">For Admin</p> admin@maipaws.com</p>
    <p>password: 1234</p>
    <br />
    <CardDescription className="text-red-500">
            สามารถ sign up ใหม่โดยกำหนด email และ     password เพื่อเข้าสู่ระบบทดสอบได้
          </CardDescription>
  </CardContent>
  
</Card>  
      <Card className="w-[490px] h-[480px]">
        <CardHeader className="mt-15 text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        {/* ✅ ใส่ onSubmit ที่ form และเอาปุ่ม login เข้าไปอยู่ใน form */}
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@maipaws.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </div>

              <Button type="submit" className="w-full">
                Login
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

