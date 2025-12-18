import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ProductDetail() {
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState('front');

    return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header & Navigation */}
        <header className="bg-white shadow">
        <nav className="bg-white shadow w-full">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">

                <span className="font-bold text-slate-800 text-sm">PetShop</span>
            </div>

            <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link to="/" className="hover:text-emerald-600">Home</Link>
                <Link to="/products" className="hover:text-emerald-600">Products</Link>
                <li><a href="#" className="hover:text-emerald-600">Contact</a></li>
                <li><a href="#" className="hover:text-emerald-600">About</a></li>
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
    </header>

      {/* Main Content */}
    <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
        <nav className="text-[11px] text-slate-500 mb-4">
            <a href="#" className="hover:text-emerald-600">Home</a>
            <span className="mx-1">/</span>
            <a href="#" className="hover:text-emerald-600">Products</a>
            <span className="mx-1">/</span>
            <span className="text-slate-400">Premium Dog Food – Chicken & Rice</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Product Images */}
            <div>
                <div className="rounded-3xl bg-white border shadow-sm p-4">
                    <div className="rounded-2xl bg-slate-100 aspect-square flex items-center justify-center text-7xl">
                    🐶
                </div>
                </div>

                <div className="mt-4 flex gap-2">
                <button
                    onClick={() => setSelectedImage('front')}
                    className={`flex-1 rounded-xl ${
                        selectedImage === 'front' ? 'border-2 border-emerald-500' : 'border'
                    } bg-slate-100 aspect-video flex items-center justify-center text-xl`}
                >
                    Front
                </button>
                <button
                    onClick={() => setSelectedImage('nutrition')}
                    className={`flex-1 rounded-xl ${
                        selectedImage === 'nutrition' ? 'border-2 border-emerald-500' : 'border'
                    } bg-slate-100 aspect-video flex items-center justify-center text-xs text-slate-500`}
                >
                    Nutrition
                </button>
                <button
                    onClick={() => setSelectedImage('size')}
                    className={`flex-1 rounded-xl ${
                        selectedImage === 'size' ? 'border-2 border-emerald-500' : 'border'
                    } bg-slate-100 aspect-video flex items-center justify-center text-xs text-slate-500`}
                >
                    Size
                </button>
                </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
                <div>
                    <p className="text-[11px] uppercase tracking-wide text-emerald-600 font-semibold">
                    Dog / Food
                    </p>
                    <h1 className="mt-1 text-2xl md:text-3xl font-bold text-slate-900">
                        Premium Dog Food – Chicken & Rice
                    </h1>
                </div>

            <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-emerald-600">฿890</p>
                <span className="text-[11px] text-slate-500">
                    In stock • 3kg bag 
                </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
                อาหารสุนัขคุณภาพสูง สูตรไก่และข้าว เหมาะสำหรับสุนัขอายุ 1 ปีขึ้นไป
                โปรตีนย่อยง่าย ไขมันสมดุล เสริมโอเมก้า 3 และ 6 ช่วยให้ขนสวยสุขภาพดี
                ไม่มีการเติมสี กลิ่น และสารกันเสียที่เป็นอันตราย 
            </p>

            <ul className="text-xs text-slate-600 space-y-1">
                <li>• สูตรสมดุลสำหรับสุนัขทุกสายพันธุ์ </li>
                <li>• เสริมวิตามินและแร่ธาตุที่จำเป็น </li>
                <li>• เหมาะสำหรับสุนัขที่ออกกำลังกายปานกลาง </li>
                <li>• ไม่มีส่วนผสมของข้าวสาลีและถั่วเหลือง </li>
            </ul>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <label className="text-xs font-medium text-slate-700">
                    Quantity
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="mt-1 w-20 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                    </label>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={() => alert(`Added ${quantity} item(s) to cart!`)}
                        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        Add to Cart
                    </button>
                    </div>
                </div>

            <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-100 p-3 text-[11px] text-emerald-900">
                {/* Additional info can go here */}
            </div>
            </div>
        </div>
        </section>
    </main>

      {/* Footer */}
    <footer className="bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
            <p>© 2025 PetShop. All rights reserved.</p>
            <p className="text-[11px] text-slate-400">
                {/* Product Detail page – Image / Price / Description / Add to Cart (UI only) */}
            </p>
        </div>
    </footer>
    </div>
    );
}




