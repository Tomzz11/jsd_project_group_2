import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
// import ProductCard from '../components/ProductCard';
// import Loading from '../components/Loading';
import { productAPI } from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { label: 'ทั้งหมด', value: 'all' },
    { label: '🐕 สุนัข', value: 'dog' },
    { label: '🐱 แมว', value: 'cat' },
    { label: '🐦 นก', value: 'bird' },
    { label: '🐟 ปลา', value: 'fish' },
    { label: '🐾 อื่นๆ', value: 'other' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        category: searchParams.get('category') || '',
        search: searchParams.get('search') || '',
        page: searchParams.get('page') || 1
      };

      const response = await productAPI.getAll(params);
      setProducts(response.data.data);
       console.log(response);
      setPagination(response.data.pagination);
     
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const handleCategoryChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newParams.set('category', value);
    } else {
      newParams.delete('category');
    }
    newParams.delete('page');
    setSearchParams(newParams);
    setCategory(value);
    setShowFilters(false);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSearchParams({});
  };

  const hasFilters = searchParams.get('search') || searchParams.get('category');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">สินค้าทั้งหมด</h1>
          <p className="text-gray-500">
            {pagination.totalProducts || 0} รายการ
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ค้นหาสินค้า..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </form>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FaFilter />
              <span>กรอง</span>
            </button>

            {/* Category Filter (Desktop) */}
            <div className="hidden md:flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    category === cat.value
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filter Panel */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <p className="font-medium mb-2">หมวดหมู่</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      category === cat.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters */}
          {hasFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
              <span className="text-sm text-gray-500">ตัวกรอง:</span>
              {searchParams.get('search') && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  ค้นหา: {searchParams.get('search')}
                </span>
              )}
              {searchParams.get('category') && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {categories.find(c => c.value === searchParams.get('category'))?.label}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
              >
                <FaTimes />
                <span>ล้างทั้งหมด</span>
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {loading ? (
          // <Loading /> 
          <div>    </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {products.map((p) => (
    <div key={p._id ?? p.id} className="bg-white rounded-xl shadow p-4">
      <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
      <h3 className="font-semibold text-gray-800 line-clamp-1">{p.name ?? "No name"}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{p.description ?? ""}</p>
      <p className="mt-2 font-bold text-primary-600">
        ฿{Number(p.price ?? 0).toLocaleString()}
      </p>
    </div>
  ))}
</div>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              
            </div> */}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ก่อนหน้า
                </button>
                
                {[...Array(pagination.totalPages)].map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => handlePageChange(idx + 1)}
                    className={`w-10 h-10 rounded-lg ${
                      pagination.currentPage === idx + 1
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasMore}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ถัดไป
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              ไม่พบสินค้า
            </h3>
            <p className="text-gray-500 mb-4">
              ลองค้นหาด้วยคำค้นอื่น หรือเปลี่ยนหมวดหมู่
            </p>
            <button
              onClick={clearFilters}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;



//   const products = [
//       {
//           id: 1,
//           category: 'Dog',
//           name: 'Premium Dog Food – Chicken & Rice',
//           description: 'อาหารเม็ดสูตรสมดุล สำหรับสุนัขอายุตั้งแต่ 1 ปีขึ้นไป',
//           price: 890,
//           emoji: '🐶'
//       },
//       {
//           id: 2,
//           category: 'Cat',
//           name: 'Grain-Free Cat Food – Salmon',
//           description: 'สูตรเกรนฟรีสำหรับแมวที่แพ้ง่าย ช่วยให้ขนเงางาม',
//           price: 720,
//           emoji: '🐱'
//       },
//       {
//           id: 3,
//           category: 'Dog / Cat',
//           name: 'Interactive Toy Set',
//           description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
//           price: 450,
//           emoji: '🎾'
//       },
//         {
//           id: 3,
//           category: 'Dog / Cat',
//           name: 'Interactive Toy Set',
//           description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
//           price: 450,
//           emoji: '🎾'
//       },
//         {
//           id: 3,
//           category: 'Dog / Cat',
//           name: 'Interactive Toy Set',
//           description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
//           price: 450,
//           emoji: '🎾'
//       },
//         {
//           id: 3,
//           category: 'Dog / Cat',
//           name: 'Interactive Toy Set',
//           description: 'ของเล่นเพิ่มกิจกรรมและลดความเครียดสำหรับสัตว์เลี้ยง',
//           price: 450,
//           emoji: '🎾'
//       },
//   ];

//   const filteredProducts = productData.filter((product) => {
//     const matchesCategory =
//       selectedCategory === "All" || product.category.includes(selectedCategory);
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const handleAddToCart = (product) => {
//     alert(`Added "${product}" to cart!`);
//     const list = JSON.parse(localStorage.getItem('productSelectedList')) || [];
//     const iq = {id: product.id, quantity: product.quantity}
//     // if (iq.id===list.id)
//     // {iq.quantity +=1}
//     list.push(iq);
//     localStorage.setItem('productSelectedList', JSON.stringify(list));
  
//   };

//   const handleAddToCart = (product) => {
//   const list =
//     JSON.parse(localStorage.getItem("productSelectedList")) || []

//   const index = list.findIndex(item => item.id === product.id)

//   if (index !== -1) {
//     // ✅ มี id นี้แล้ว → เพิ่ม quantity
//     list[index].quantity += product.quantity
//   } else {
//     // ✅ ยังไม่มี → เพิ่มใหม่
//     list.push({
//       id: product.id,
//       quantity: product.quantity
//     })
//   }

//   localStorage.setItem(
//     "productSelectedList",
//     JSON.stringify(list)
//   )

//   alert(`Added "${product.name}" to cart!`)
// }

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50">
//       {/* Main Content */}
//       <main className="flex-1">
//         <section className="max-w-6xl mx-auto px-4 py-10">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
//                 Products
//               </h1>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
//               {/* Category Filter */}
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-medium text-slate-600">
//                   Category:
//                 </span>
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => setSelectedCategory("All")}
//                     className={`rounded-full border px-3 py-1 text-xs font-semibold ${
//                       selectedCategory === "All"
//                         ? "border-emerald-500 bg-emerald-50 text-emerald-600"
//                         : "text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
//                     }`}
//                   >
//                     All
//                   </button>
//                   <button
//                     onClick={() => setSelectedCategory("Dog")}
//                     className={`rounded-full border px-3 py-1 text-xs font-semibold ${
//                       selectedCategory === "Dog"
//                         ? "border-emerald-500 bg-emerald-50 text-emerald-600"
//                         : "text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
//                     }`}
//                   >
//                     Dog
//                   </button>
//                   <button
//                     onClick={() => setSelectedCategory("Cat")}
//                     className={`rounded-full border px-3 py-1 text-xs font-semibold ${
//                       selectedCategory === "Cat"
//                         ? "border-emerald-500 bg-emerald-50 text-emerald-600"
//                         : "text-slate-600 hover:border-emerald-500 hover:text-emerald-600"
//                     }`}
//                   >
//                     Cat
//                   </button>
//                 </div>
//               </div>

//               {/* Search */}
//               <div className="flex-1 sm:flex-none">
//                 <label className="relative block">
//                   <span className="sr-only">Search</span>
//                   <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-xs">
//                     🔍
//                   </span>
//                   <input
//                     type="text"
//                     placeholder="Search product..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full rounded-full border border-slate-200 bg-white py-2 pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <article
//                   key={product.id}
//                   className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col"
//                 >
//                   <div className="rounded-t-2xl bg-slate-100 aspect-[4/3] flex items-center justify-center text-4xl">
//                     {product.emoji}
//                   </div>
//                   <div className="p-4 flex flex-col flex-1">
//                     <p className="text-[11px] uppercase tracking-wide text-emerald-600 font-semibold">
//                       {product.category}
//                     </p>
//                     <h2 className="mt-1 font-semibold text-sm text-slate-900 line-clamp-2">
//                       {product.name}
//                     </h2>
//                     <p className="mt-1 text-xs text-slate-500 line-clamp-2">
//                       {product.description}
//                     </p>
//                     <p className="mt-2 font-bold text-emerald-600 text-sm">
//                       ฿{product.price.toLocaleString()}
//                     </p>

//                     <div className="mt-3 flex items-center justify-between gap-2">
//                       <Link to="/product/1" className="hover:text-emerald-600">
//                         {" "}
//                         ดูรายละเอียดสินค้า
//                       </Link>

//                       <button
//                         onClick={() => handleAddToCart(product)}
//                         className="rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-700"
//                       >
//                         Add to Cart
//                       </button>
//                     </div>
//                   </div>
//                 </article>
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12">
//                 <p className="text-slate-500 text-sm">
//                   ไม่พบสินค้าที่ตรงกับการค้นหา
//                 </p>
//               </div>
//             )}
//           </div>
//           {loading && <p className="text-center mt-6">Loading...</p>}
//         </section>
//       </main>
//       {/* Footer */}
//       <footer className="bg-slate-900 text-slate-300 text-xs">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
//           <p>© 2025 PetShop. All rights reserved.</p>
//           <p className="text-[11px] text-slate-400">
//             {/* Products page – List + Filter dog/cat + Search + Add to Cart (UI only) */}
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

