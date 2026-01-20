import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const CATEGORIES = ["cat", "dog", "bird", "fish"];

  useEffect(() => {
    document.body.style.backgroundColor = "#FFF8EE";
    const draft = localStorage.getItem("productDraft");
    if (draft) {
      try {
        setForm(JSON.parse(draft));
      } catch (err) {
        console.error("Failed to parse draft:", err);
      }
    }
    return () => {
      document.body.style.backgroundColor = ""; 
    };
  }, []);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    description: "",
    stock: 10, // ✅ เปลี่ยนจาก countInStock เป็น stock
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleImage = (file) => {
    if (!file) {
      setForm({ ...form, image: null });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const saveDraft = () => {
    const draftData = {
      name: form.name,
      category: form.category,
      price: form.price,
      description: form.description,
      stock: form.stock, // ✅ เปลี่ยนเป็น stock
    };
    localStorage.setItem("productDraft", JSON.stringify(draftData));
    alert("บันทึกร่างเรียบร้อย");
  };

  const cancelForm = () => {
    setForm({ 
      name: "", 
      category: "", 
      price: "", 
      image: null,
      description: "",
      stock: 10, // ✅ เปลี่ยนเป็น stock
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
      const userInfo = storedUser ? JSON.parse(storedUser) : null;
      const token = userInfo?.token || userInfo?.data?.token || userInfo;

      if (!token || typeof token !== 'string') {
        alert("ไม่เจอ Token ในระบบ กรุณาล็อคอินใหม่");
        setIsUploading(false);
        return;
      }

      let imageUrl = "/images/sample.jpg";
      
      if (form.image && form.image.startsWith("data:")) {
        const blob = await fetch(form.image).then(r => r.blob());
        const file = new File([blob], "product.jpg", { type: blob.type });
        
        const formData = new FormData();
        formData.append("image", file);

        const uploadConfig = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };

        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload/product",
          formData,
          uploadConfig
        );

        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.data.url;
        } else {
          alert("อัพโหลดรูปไม่สำเร็จ");
          setIsUploading(false);
          return;
        }
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const payload = {
        name: form.name,
        category: form.category,
        price: Number(form.price),
        image: imageUrl,
        brand: "MaiPaws",
        description: form.description || "No description provided",
        stock: Number(form.stock), // ✅ เปลี่ยนจาก countInStock เป็น stock
      };

      await axios.post("http://localhost:5000/api/products", payload, config);
      
      alert("บันทึกสินค้าเรียบร้อยแล้ว!");
      cancelForm();
      localStorage.removeItem("productDraft");
      navigate("/admin/products");

    } catch (error) {
      const errResponse = error.response?.data;
      console.error("--- BACKEND ERROR DETAIL ---");
      console.log("Message:", errResponse?.message);
      alert(`พัง: ${errResponse?.message || "Internal Server Error"}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 min-h-screen">
      <aside className="w-full md:w-52 bg-[#ffeecb] p-3 h-fit mt-16 rounded-xl shadow-md self-start">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Products</h2>
        <ul className="space-y-2">
          <li>
            <button 
              onClick={() => navigate("/admin/products/add")} 
              className="p-2 rounded text-left bg-sky-400/40 w-full text-orange-500 font-semibold"
            >
              Add Products
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/admin/products")} 
              className="flex gap-3 items-center p-2 rounded hover:bg-white/30 w-full hover:text-indigo-500 font-semibold"
            >
              Manage List
            </button>
          </li>
          <li>
            <button 
              onClick={() => navigate("/admin/update/orders")} 
              className="flex gap-3 items-center p-2 rounded hover:bg-white/30 w-full hover:text-red-700 font-semibold"
            >
              Order Status
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-2">
        <section className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100 max-w-3xl mx-auto text-black">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
            Add New Product
          </h3>

          <form onSubmit={submitForm} className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg overflow-hidden flex items-center justify-center shadow-inner">
                {form.image ? (
                  <img src={form.image} className="object-cover w-full h-full" alt="Preview" />
                ) : (
                  <div className="text-center">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                  onChange={(e) => handleImage(e.target.files[0])}
                  disabled={isUploading}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all bg-white"
                  disabled={isUploading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all bg-white"
                  disabled={isUploading}
                >
                  <option value="">-- Select Category --</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="4"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all bg-white resize-none"
                  disabled={isUploading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    required
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all bg-white"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    required
                    min="0"
                    value={form.stock} // ✅ เปลี่ยนเป็น stock
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} // ✅ เปลี่ยนเป็น stock
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all bg-white"
                    disabled={isUploading}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end pt-6 border-t">
              <button 
                type="button" 
                onClick={cancelForm} 
                className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                Clear
              </button>
              <button 
                type="button" 
                onClick={saveDraft} 
                className="bg-cyan-500 px-6 py-2 rounded-lg font-semibold text-white hover:bg-cyan-600 shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                Save Draft
              </button>
              <button 
                type="submit" 
                className="bg-purple-600 px-8 py-2 rounded-lg font-semibold text-white hover:bg-purple-700 shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isUploading}
              >
                {isUploading ? "กำลังบันทึก..." : "Confirm Save"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}