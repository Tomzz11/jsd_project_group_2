// Products.jsx - หน้า Product List
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { productAPI } from "../services/api";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
    hasMore: false
  });
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { label: "ทั้งหมด", value: "all" },
    { label: "🐕 สุนัข", value: "dog" },
    { label: "🐱 แมว", value: "cat" },
    { label: "🐦 นก", value: "bird" },
    { label: "🐟 ปลา", value: "fish" },
    { label: "🐾 อื่นๆ", value: "other" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        category: searchParams.get("category") || "",
        search: searchParams.get("search") || "",
        page: searchParams.get("page") || 1,
      };

      const response = await productAPI.getAll(params);
      
      if (response.data?.success) {
        setProducts(response.data.data || []);
        setPagination(response.data.pagination || {
          currentPage: 1,
          totalPages: 0,
          totalProducts: 0,
          hasMore: false
        });
      }
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set("search", search);
    } else {
      newParams.delete("search");
    }
    newParams.delete("page");
    setSearchParams(newParams);
  };

  const handleCategoryChange = (value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      newParams.set("category", value);
    } else {
      newParams.delete("category");
    }
    newParams.delete("page");
    setSearchParams(newParams);
    setCategory(value);
    setShowFilters(false);
  };

  const handlePageChange = (page) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page);
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSearchParams({});
  };

const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const success = addToCart(product, 1);
    if (success) {
      toast.success(`เพิ่ม ${product.name} ลงตะกร้าแล้ว!`);
    } else {
      toast.error('ไม่สามารถเพิ่มสินค้าได้');
    }
  };


  const hasFilters = searchParams.get("search") || searchParams.get("category");
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            สินค้าทั้งหมด
          </h1>
          <p className="text-gray-500">
            {pagination?.totalProducts || 0} รายการ
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
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
              {searchParams.get("search") && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  ค้นหา: {searchParams.get("search")}
                </span>
              )}
              {searchParams.get("category") && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                  {
                    categories.find(
                      (c) => c.value === searchParams.get("category")
                    )?.label
                  }
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
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product._id} className="min-h-[480px] overflow-hidden rounded-3xl shadow-md hover:shadow-xl transition-shadow">
                  {/* Image area */}
                  <Link to={`/products/${product._id}`}>
                    <div className="min-h-[200px] bg-muted cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Content area */}
                  <CardContent className="flex h-[220px] flex-col p-6">
                    <Link to={`/products/${product._id}`}>
                      <h3 className="line-clamp-2 text-base font-semibold hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-xl font-bold">
                        ฿{Number(product.price).toLocaleString("th-TH")}
                      </p>

                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ฿{Number(product.originalPrice).toLocaleString("th-TH")}
                        </p>
                      )}
                    </div>

                    {/* Push actions to bottom */}
                    <div className="mt-auto flex gap-2">
                      <button
      className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      onClick={() => handleAddToCart(product)}
    >
      Add to cart
    </button>
                      <Link to={`/products/${product._id}`} className="flex-shrink-0">
                        <button className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-muted">
                          View
                        </button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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