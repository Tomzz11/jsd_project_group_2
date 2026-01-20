import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { config } from "../config/config.js";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let y = currentYear; y >= 1950; y--) list.push(String(y));
    return list;
  }, []);

  const days = useMemo(
    () => Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")),
    []
  );

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validation เบื้องต้น
    if (!form.firstName.trim() || !form.lastName.trim())
      return setError("Please enter name and lastname");
    if (!form.email.trim()) return setError("Please enter email");
    if (!form.password || form.password.length < 4)
      return setError("Password must be at least 4 characters");
    if (!form.phone.trim()) return setError("Please enter phone");
    if (!form.dobDay || !form.dobMonth || !form.dobYear)
      return setError("Please select date of birth");

    // (optional) กันวันที่ไม่จริง เช่น 31/02
    const isoBirthday = `${form.dobYear}-${form.dobMonth}-${form.dobDay}`;
    const d = new Date(isoBirthday);
    if (Number.isNaN(d.getTime())) return setError("Invalid date of birth");

    const userData = {
      name: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      phone: form.phone.trim(),
      birthday: isoBirthday, // ✅ แก้ชื่อ key ให้ตรง backend
      avatarUrl: "/avatars/default-user.png",
    };

    try {
      setLoading(true);

      const response = await axios.post(
        `${config.apiUrl}/api/auth/register`,
        userData
      );

      // ✅ backend ส่ง 201 ตอนสมัครสำเร็จ
      if (response.status === 201 && response.data?.success) {
        navigate("/Login", { replace: true });
        return;
      }

      // เผื่อกรณีตอบกลับมาแต่ success=false
      setError(response.data?.message || "Register failed");
    } catch (err) {
      // ✅ โชว์ข้อความจริงจาก backend (เช่น อีเมลซ้ำ/เบอร์ซ้ำ)
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Register failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

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
              <FieldDescription>
                All transactions are secure and encrypted
              </FieldDescription>

              <FieldGroup>
                {error && <p className="text-sm text-red-500">{error}</p>}

                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    placeholder="Enter your name"
                    value={form.firstName}
                    onChange={setField("firstName")}
                  />

                  <FieldLabel className="mt-3">Lastname</FieldLabel>
                  <Input
                    placeholder="Enter your lastname"
                    value={form.lastName}
                    onChange={setField("lastName")}
                  />
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    id="useremail"
                    placeholder="example@gmail.com"
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                  />

                  <FieldLabel className="mt-3">Password</FieldLabel>
                  <Input
                    id="userpassword"
                    placeholder="Enter your password"
                    type="password"
                    value={form.password}
                    onChange={setField("password")}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Password อย่างน้อย 4 ตัว
                  </p>
                </Field>

                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Date of Birth</FieldLabel>
                    <Select
                      value={form.dobDay}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, dobDay: v }))
                      }
                    >
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
                    <Select
                      value={form.dobMonth}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, dobMonth: v }))
                      }
                    >
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
                    <Select
                      value={form.dobYear}
                      onValueChange={(v) =>
                        setForm((p) => ({ ...p, dobYear: v }))
                      }
                    >
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
                    type="tel"
                    value={form.phone}
                    onChange={setField("phone")}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <Field orientation="horizontal">
              <Button type="submit" className="w-28 h-9" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
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
  );
};

export default Register;
