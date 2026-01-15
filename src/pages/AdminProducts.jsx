import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminProducts = () => {
  const navigate = useNavigate();

  // ใส่ useEffect เพื่อคุมสีพื้นหลังทั้งหน้า Admin
  useEffect(() => {
    document.body.style.backgroundColor = "#FFF8EE"; // สีเทาอ่อน
    return () => {
      document.body.style.backgroundColor = ""; // คืนค่าสีเดิมเมื่อออก
    };
  }, []);

  const [data, setData] = useState([
    { image: "—", name: "Product 1", category: "Cat A", price: "$10" },
    { image: "—", name: "Product 2", category: "Cat B", price: "$20" },
    { image: "—", name: "Product 3", category: "Cat C", price: "$30" },
  ]);

  const maxRows = 6;
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", category: "", price: "", image: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 9; // สมมติค่า

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const openEdit = (index) => {
    if (!data[index]) return;
    setEditIndex(index);
    setEditForm(data[index]);
  };

  const closeModal = () => setEditIndex(null);

  const saveEdit = () => {
    const newData = [...data];
    newData[editIndex] = editForm;
    setData(newData);
    closeModal();
  };

  const deleteProduct = (index) => {
    if (window.confirm("Are you sure?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setEditForm({ ...editForm, image: reader.result });
    reader.readAsDataURL(file);
  };

  const renderPagination = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return (
    /* พื้นหลังทั้งหน้าใช้ min-h-screen */
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4 min-h-screen">
      <aside className="w-full md:w-52 bg-[#ffeecb] p-3 h-fit mt-16 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Products</h2>
        <ul className="space-y-2">
          <li>
            <button onClick={() => navigate("/add-product")} className="p-2 rounded hover:bg-white/30 w-full text-left font-medium hover:text-orange-500 font-semibold">
              Add Products
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/AdminProducts")} className="flex gap-3 items-center p-2 rounded text-indigo-500 bg-sky-400/40 w-full text-left font-semibold">
              Manage List
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="p-2 rounded hover:bg-white/30 w-full text-left font-medium text-red-700 font-semibold">
              Log out
            </button>
          </li>
        </ul>
      </aside>

      <main className="flex-1 p-4">
        {/* ส่วนจัดการสินค้า */}
        <section className="bg-[#dfe0df] p-6 rounded-xl shadow-sm border border-neutral-950">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Products Management</h3>
          <input type="text" placeholder="Search" className="w-full p-2 border border-amber-700 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-amber-600" />

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-100">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-amber-300 border-b">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...Array(maxRows)].map((_, i) => (
                  /* ใส่ even:bg-gray-50 เพื่อทำสีสลับฟันปลา */
                  <tr key={i} className="hover:bg-gray-200 transition-colors even:bg-gray-50">
                    <td className="p-4">
                      {data[i]?.image?.includes("data:image") ? (
                        <img src={data[i].image} className="w-12 h-12 object-cover rounded shadow-sm" />
                      ) : (
                        data[i]?.image || "—"
                      )}
                    </td>
                    <td className="p-4">{data[i]?.name || "—"}</td>
                    <td className="p-4">{data[i]?.category || "—"}</td>
                    <td className="p-4">{data[i]?.price || "—"}</td>
                    <td className="p-4">
                      {data[i] && (
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(i)} className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">✏️ Edit</button>
                          <button onClick={() => deleteProduct(i)} className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">🗑️ Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50">Prev</button>
            {renderPagination().map((p) => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-1 rounded ${p === currentPage ? "bg-purple-600 text-white" : "bg-gray-400"}`}>{p}</button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50">Next</button>
          </div>
        </section>
      </main>

      {/* Edit Modal */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="space-y-3">
              <input className="border p-2 w-full rounded" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
              <input className="border p-2 w-full rounded" value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} placeholder="Category" />
              <input className="border p-2 w-full rounded" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} placeholder="Price" />
              <input type="file" className="text-sm" onChange={(e) => handleImage(e.target.files[0])} />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={closeModal} className="px-4 py-2 border rounded-lg">Cancel</button>
              <button onClick={saveEdit} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};