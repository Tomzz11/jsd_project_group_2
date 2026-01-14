import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'

  
 

const Login  = () => {
  return (
    <div className="flex min-h-screen items-center justify-center  p-4  bg-center  absolute inset-0 z-0 " style={{ backgroundImage: "url('/ryan-walton-AbNO2iejoXA-unsplash.jpg')" } }>
        
      <Card className=" w-[490px] h-[480px]" >
      <CardHeader className="mt-15 text-center">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col   gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4  hover:text-blue-700"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-5 ">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Link to="/Register" className='w-full'>
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