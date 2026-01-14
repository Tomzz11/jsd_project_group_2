import React, { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"

import { registerMock, loginMock } from "@/lib/auth"

const Register = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  })

  const [error, setError] = useState("")

  const years = useMemo(() => {
    // ให้เป็นปีสมจริง เช่น 1950 - 2026
    const currentYear = new Date().getFullYear()
    const list = []
    for (let y = currentYear; y >= 1950; y--) list.push(String(y))
    return list
  }, [])

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")), [])
  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")), [])

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    // validation เบื้องต้น
    if (!form.firstName || !form.lastName) return setError("Please enter name and lastname")
    if (!form.email) return setError("Please enter email")
    if (!form.password || form.password.length < 4) return setError("Password must be at least 4 characters")
    if (!form.phone) return setError("Please enter phone")
    if (!form.dobDay || !form.dobMonth || !form.dobYear) return setError("Please select date of birth")

    try {
      // 1) register (เพิ่ม user ลง localStorage)
      registerMock({
        email: form.email,
        password: form.password,
        // เผื่ออยากเก็บ profile เพิ่ม (ถ้า auth.js รองรับ)
        profile: {
          displayName: `${form.firstName} ${form.lastName}`,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          birthday: `${form.dobYear}-${form.dobMonth}-${form.dobDay}`,
        },
      })

      // 2) login อัตโนมัติ
      loginMock({ email: form.email, password: form.password })

      // 3) ไป dashboard
      navigate("/UserDashboard", { replace: true })
    } catch (err) {
      setError(err?.message || "Register failed")
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 bg-center absolute inset-0 z-0"
      style={{ backgroundImage: "url('/ryan-walton-AbNO2iejoXA-unsplash.jpg')" }}
    >
      <div className="w-full max-w-2xl mx-auto py-10">
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Register</FieldLegend>
              <FieldDescription>All transactions are secure and encrypted</FieldDescription>

              <FieldGroup>
                {error && <p className="text-sm text-red-500">{error}</p>}

                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    placeholder="Enter your name"
                    required
                    value={form.firstName}
                    onChange={setField("firstName")}
                  />

                  <FieldLabel className="mt-3">Lastname</FieldLabel>
                  <Input
                    placeholder="Enter your lastname"
                    required
                    value={form.lastName}
                    onChange={setField("lastName")}
                  />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    id="useremail"
                    placeholder="example@gmail.com"
                    required
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                  />

                  <FieldLabel className="mt-3">Password</FieldLabel>
                  <Input
                    id="userpassword"
                    placeholder="Enter your password"
                    required
                    type="password"
                    value={form.password}
                    onChange={setField("password")}
                  />
                  <p className="text-xs text-gray-500 mt-1">Mock register: password อย่างน้อย 4 ตัว</p>
                </Field>

                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Date of Birth</FieldLabel>
                    <Select value={form.dobDay} onValueChange={(v) => setForm((p) => ({ ...p, dobDay: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="DD" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Month of Birth</FieldLabel>
                    <Select value={form.dobMonth} onValueChange={(v) => setForm((p) => ({ ...p, dobMonth: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field>
                    <FieldLabel>Year</FieldLabel>
                    <Select value={form.dobYear} onValueChange={(v) => setForm((p) => ({ ...p, dobYear: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field>
                  <FieldLabel>Phone</FieldLabel>
                  <Input
                    id="userphone"
                    placeholder="Enter your phone number"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={setField("phone")}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal">
              <Button type="submit" className="w-20 h-9">
                Submit
              </Button>

              <Link to="/Login">
                <Button variant="outline" type="button" className="w-20 h-9">
                  Back
                </Button>
              </Link>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  )
}

export default Register
