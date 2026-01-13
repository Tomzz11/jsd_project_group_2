import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/components/mockdata/products";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = products;
      setProductData(response);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const products = [
  //     {
  //         id: 1,
  //         category: 'Dog',
  //         name: 'Premium Dog Food – Chicken & Rice',
  //         description: 'อาหารเม็ดสูตรสมดุล สำหรับสุนัขอายุตั้งแต่ 1 ปีขึ้นไป',
  //         price: 890,
  //         emoji: '🐶'
  //     },
  //     {
  //         id: 2,
  //         category: 'Cat',
  //         name: 'Grain-Free Cat Food – Salmon',
  //         description: 'สูตรเกรนฟรีสำหรับแมวที่แพ้ง่าย ช่วยให้ขนเงางาม',
  //         price: 720,
  //         emoji: '🐱'
  //     },
  //     {
  //         id: 3,
  //         category: 'Dog / Cat',
  //         name: 'Interactive Toy Set',
  //         description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
  //         price: 450,
  //         emoji: '🎾'
  //     },
  //       {
  //         id: 3,
  //         category: 'Dog / Cat',
  //         name: 'Interactive Toy Set',
  //         description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
  //         price: 450,
  //         emoji: '🎾'
  //     },
  //       {
  //         id: 3,
  //         category: 'Dog / Cat',
  //         name: 'Interactive Toy Set',
  //         description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
  //         price: 450,
  //         emoji: '🎾'
  //     },
  //       {
  //         id: 3,
  //         category: 'Dog / Cat',
  //         name: 'Interactive Toy Set',
  //         description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
  //         price: 450,
  //         emoji: '🎾'
  //     },
  // ];

  const filteredProducts = productData.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category.includes(selectedCategory);
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // const handleAddToCart = (product) => {
  //   alert(`Added "${product}" to cart!`);
  //   const list = JSON.parse(localStorage.getItem('productSelectedList')) || [];
  //   const iq = {id: product.id, quantity: product.quantity}
  //   // if (iq.id===list.id)
  //   // {iq.quantity +=1}
  //   list.push(iq);
  //   localStorage.setItem('productSelectedList', JSON.stringify(list));
  
  // };

  const handleAddToCart = (product) => {
  const list =
    JSON.parse(localStorage.getItem("productSelectedList")) || []

  const index = list.findIndex(item => item.id === product.id)

  if (index !== -1) {
    // ✅ มี id นี้แล้ว → เพิ่ม quantity
    list[index].quantity += product.quantity
  } else {
    // ✅ ยังไม่มี → เพิ่มใหม่
    list.push({
      id: product.id,
      quantity: product.quantity
    })
  }

  localStorage.setItem(
    "productSelectedList",
    JSON.stringify(list)
  )

  alert(`Added "${product.name}" to cart!`)
}

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Main Content */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Products
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-600">
                  Category:
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      selectedCategory === "All"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedCategory("Dog")}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      selectedCategory === "Dog"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
                    }`}
                  >
                    Dog
                  </button>
                  <button
                    onClick={() => setSelectedCategory("Cat")}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      selectedCategory === "Cat"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                        : "text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
                    }`}
                  >
                    Cat
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 sm:flex-none">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
                >
                  <div className="rounded-t-2xl bg-slate-100 aspect-[4/3] flex items-center justify-center text-4xl">
                    {product.emoji}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-[11px] uppercase tracking-wide text-emerald-600 font-semibold">
                      {product.category}
                    </p>
                    <h2 className="mt-1 font-semibold text-sm text-slate-900 line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="mt-2 font-bold text-emerald-600 text-sm">
                      ฿{product.price.toLocaleString()}
                    </p>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <Link to="/product/1" className="hover:text-emerald-600">
                        {" "}
                        ดูรายละเอียดสินค้า
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-slate-500 text-sm">
                  ไม่พบสินค้าที่ตรงกับการค้นหา
                </p>
              </div>
            )}
          </div>
          {loading && <p className="text-center mt-6">Loading...</p>}
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 text-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© 2025 PetShop. All rights reserved.</p>
          <p className="text-[11px] text-slate-400">
            {/* Products page – List + Filter dog/cat + Search + Add to Cart (UI only) */}
          </p>
        </div>
      </footer>
    </div>
  );
}
