import React from 'react';
import { Link } from 'react-router-dom';


export default function PetShop() {
    return (
    <div className="min-h-screen flex flex-col bg-slate-50">
        <nav className="bg-white shadow w-full">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        
            <div className="flex items-center gap-2">
                <span className="font-bold text-sm">PetShop</span>
            </div>
            <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link to="/" className="hover:text-emerald-600">Home</Link>
                <Link to="/products" className="hover:text-emerald-600">Products</Link>
                <li><a href="#" >Contact</a></li>
                <li><a href="#" >About</a></li>
            </ul>
            <div className="flex items-center gap-3">
                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-slate-100">
                Login
                </button>
            <button className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700">
                Register
            </button>
            </div>
        </div>
    </nav>

    <main className="flex-1">
        <section className="bg-emerald-50">
        <div className="max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Welcome to PetShop
                </p>
                <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                    ของใช้สำหรับสัตว์เลี้ยง<br />
                    ที่ใส่ใจเหมือนคนในครอบครัว  
                </h1>
                <p className="mt-4 text-slate-600 text-sm md:text-base">
                    เลือกอาหาร ของเล่น และอุปกรณ์สำหรับทั้งสุนัขและแมว  
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-emerald-700 transition">
                    Shop Now
                </button>
                <span className="text-xs text-slate-500">
                    เริ่มช้อปสินค้าแนะนำสำหรับน้องหมาและน้องแมว 
                </span>
                </div>
            </div>

            <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-200/60 to-cyan-100/60 blur-xl"></div>
                <div className="relative z-10 grid grid-cols-2 gap-4 rounded-3xl bg-white p-4 shadow-lg">
                    <div className="space-y-4">
                    <div className="rounded-2xl bg-emerald-100 aspect-square flex items-center justify-center text-4xl">
                        {/*  */}
                    </div>    
                </div>
                <div className="rounded-2xl bg-emerald-100 aspect-square flex items-center justify-center text-4xl">
                  {/*  */}
                </div>
            </div>
            </div>
        </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                สินค้าแนะนำ
            </h2>
            <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700">
                ดูสินค้าทั้งหมด →
            </a>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <article className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition p-4 flex flex-col">
                <div className="rounded-xl bg-slate-100 aspect-[4/3] mb-3 flex items-center justify-center text-4xl">
                    {/*  */}
                </div>
                <h3 className="font-semibold text-sm text-slate-900">
                    Premium Dog Food – Chicken & Rice
                </h3>
                <p className="mt-1 text-xs text-slate-500">เหมาะสำหรับสุนัขทุกสายพันธุ์</p>
                <p className="mt-2 font-bold text-emerald-600 text-sm">฿890</p>
                <button className="mt-3 inline-flex justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                    ดูรายละเอียด
                </button>
            </article>

            <article className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition p-4 flex flex-col">
                <div className="rounded-xl bg-slate-100 aspect-[4/3] mb-3 flex items-center justify-center text-4xl">
                        {/*  */}
                </div>
                <h3 className="font-semibold text-sm text-slate-900">
                            Soft Bed for Cats & Dogs
                </h3>
                <p className="mt-1 text-xs text-slate-500">เตียงนุ่มพิเศษสำหรับเพื่อนรักสี่ขา</p>
                <p className="mt-2 font-bold text-emerald-600 text-sm">฿1,290</p>
                <button className="mt-3 inline-flex justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                        ดูรายละเอียด
                </button>
            </article>

            <article className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition p-4 flex flex-col">
                <div className="rounded-xl bg-slate-100 aspect-[4/3] mb-3 flex items-center justify-center text-4xl">
                        {/*  */}
                </div>
                <h3 className="font-semibold text-sm text-slate-900">
                    Interactive Toy Set
                </h3 >
                <p>ของเล่นเสริมสร้างสมองและกล้ามเนื้อ</p>
                <p mt-2 font-bold text-emerald-600 text-sm>฿450</p>
                <button  className="mt-3 inline-flex justify-center rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700">
                    ดูรายละเอียด
            </button>
                </article>
        </div>
            </section>
    </main>
    <footer className="bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <p>© 2025 PetShop. All rights reserved.</p>
        </div>
    </footer>
    </div>
    );
}

