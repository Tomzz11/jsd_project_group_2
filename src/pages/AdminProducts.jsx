import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminProducts = () => {
  const navigate = useNavigate();

  // ✅ กำหนด Category (พิมพ์เล็กทั้งหมด)
  const CATEGORIES = ["cat", "dog", "bird", "fish"];

  const [data, setData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: "", 
    category: "", 
    price: "", 
    image: "",
    description: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const maxRows = 6;

  const fetchProducts = async () => {
    try {
      const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
      const userInfo = storedUser ? JSON.parse(storedUser) : null;
      const token = userInfo?.token || userInfo?.data?.token || userInfo;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get("http://localhost:5000/api/products", config);
      
      let productsArray = [];
      if (Array.isArray(response.data)) productsArray = response.data;
      else if (response.data.products) productsArray = response.data.products;
      else if (response.data.data) productsArray = response.data.data;
      
      setData(productsArray);
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    document.body.style.backgroundColor = "#FFF8EE";
    return () => { document.body.style.backgroundColor = ""; };
  }, []);

  const filteredData = data.filter((item) => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / maxRows) || 1;
  const currentTableData = filteredData.slice((currentPage - 1) * maxRows, (currentPage - 1) * maxRows + maxRows);

  const openEdit = (indexInCurrentPage) => {
    const itemToEdit = currentTableData[indexInCurrentPage];
    const actualIndex = data.findIndex(i => i._id === itemToEdit._id);
    setEditIndex(actualIndex);
    setEditForm({ 
      name: data[actualIndex].name || "",
      category: data[actualIndex].category || "",
      price: data[actualIndex].price || "",
      image: data[actualIndex].image || "",
      description: data[actualIndex].description || "",
      brand: data[actualIndex].brand || "General",
      countInStock: data[actualIndex].countInStock || 10
    });
  };

  const closeModal = () => setEditIndex(null);

  const saveEdit = async () => {
    try {
      const productId = data[editIndex]._id;
      const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
      const userInfo = storedUser ? JSON.parse(storedUser) : null;
      const token = userInfo?.token || userInfo?.data?.token || userInfo;

      const dataToUpdate = {
        name: editForm.name,
        category: editForm.category, // ✅ ส่งเป็นพิมพ์เล็ก
        price: Number(editForm.price),
        image: editForm.image,
        brand: editForm.brand || "General",
        description: editForm.description || "No description",
        countInStock: editForm.countInStock || 10
      };

      await axios.put(`http://localhost:5000/api/products/${productId}`, dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("แก้ไขข้อมูลสำเร็จ!");
      await fetchProducts();
      closeModal();
    } catch (error) { 
      console.error("Update fail:", error.response?.data || error.message); 
      alert("แก้ไขไม่สำเร็จ: " + (error.response?.data?.message || "Internal Error"));
    }
  };

  const deleteProduct = async (indexInCurrentPage) => {
    const itemToDelete = currentTableData[indexInCurrentPage];
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ ${itemToDelete.name}?`)) {
      try {
        const storedUser = localStorage.getItem("userInfo") || localStorage.getItem("user");
        const userInfo = storedUser ? JSON.parse(storedUser) : null;
        const token = userInfo?.token || userInfo?.data?.token || userInfo;

        await axios.delete(`http://localhost:5000/api/products/${itemToDelete._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        alert("ลบสำเร็จ!");
        await fetchProducts();
      } catch (error) { 
        console.error("Delete fail:", error.response?.data || error.message); 
        alert("ลบไม่สำเร็จ");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-6 min-h-screen">
      <aside className="w-full md:w-52 bg-[#ffeecb] p-3 h-fit mt-16 rounded-xl shadow-md self-start">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Products</h2>
        <ul className="space-y-2">
          <li>
             <button onClick={() => navigate("/admin/products/add")} className="p-2 rounded text-left hover:bg-white/30 w-full hover:text-orange-500 font-semibold">
              Add Products
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/products")} className="flex gap-3 items-center p-2 rounded bg-sky-400/40 w-full  font-semibold text-indigo-500">
              Manage List
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/update/orders")} className="flex gap-3 items-center p-2 rounded hover:bg-white/30 w-full hover:text-red-700 font-semibold">
              Order Status
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-4">
        <section className="bg-[#dfe0df] p-6 rounded-xl shadow-sm border border-neutral-950">
          <h3 className="text-xl font-bold mb-4 text-black text-gray-800">Products Management</h3>
          
          <input
            type="text"
            placeholder="ค้นหาชื่อสินค้า หรือ หมวดหมู่..."
            className="w-full p-2 border border-amber-700 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-amber-600 bg-white text-black"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="overflow-x-auto rounded-lg border border-gray-100 bg-white">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-amber-300 border-b">
                <tr>
                  <th className="p-4 text-black">Image</th>
                  <th className="p-4 text-black">Name</th>
                  <th className="p-4 text-black">Category</th>
                  <th className="p-4 text-black">Price</th>
                  <th className="p-4 text-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-black">
                {currentTableData.length > 0 ? (
                  currentTableData.map((item, i) => (
                    <tr key={item._id || i} className="hover:bg-gray-200 even:bg-gray-50">
                      <td className="p-4">
                        {item.image && item.image !== "no pic" ? (
                          <img src={item.image} className="w-12 h-12 object-cover rounded shadow-sm" alt="product" />
                        ) : "—"}
                      </td>
                      <td className="p-4 font-medium">{item.name}</td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4 font-bold text-orange-600">{item.price}</td>
                      <td className="p-4 flex gap-2">
                        <button onClick={() => openEdit(i)} className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">Edit</button>
                        <button onClick={() => deleteProduct(i)} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Del</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5" className="p-10 text-center font-bold text-gray-500">ไม่พบสินค้า</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 text-white text-sm">Prev</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 rounded text-sm ${currentPage === i + 1 ? "bg-purple-600 text-white font-bold" : "bg-gray-400 text-white"}`}>{i + 1}</button>
            ))}
            <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 text-white text-sm">Next</button>
          </div>
        </section>
      </main>

      {/* Modal Edit */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-black max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">ชื่อสินค้า</label>
                <input 
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none" 
                  value={editForm.name} 
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} 
                />
              </div>

              {/* ✅ เปลี่ยนเป็น select dropdown (พิมพ์เล็ก) */}
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">หมวดหมู่</label>
                <select 
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none" 
                  value={editForm.category} 
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
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
                <label className="text-xs font-bold text-gray-500 block mb-1">คำอธิบาย</label>
                <textarea 
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none resize-none" 
                  rows="4"
                  value={editForm.description} 
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
                  placeholder="กรอกคำอธิบายสินค้า"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">ราคา</label>
                <input 
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400 outline-none" 
                  type="number" 
                  value={editForm.price} 
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} 
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6 border-t pt-4">
              <button onClick={closeModal} className="px-4 py-2 border rounded-lg hover:bg-gray-100">ยกเลิก</button>
              <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">บันทึกข้อมูล</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};