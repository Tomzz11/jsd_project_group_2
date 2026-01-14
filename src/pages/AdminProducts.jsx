import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminProducts = () => {
  /* =========================
     Navigation
  ========================== */
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  /* =========================
     Product Data
  ========================== */
  const [data, setData] = useState([
    { image: "—", name: "Product 1", category: "Cat A", price: "$10" },
    { image: "—", name: "Product 2", category: "Cat B", price: "$20" },
    { image: "—", name: "Product 3", category: "Cat C", price: "$30" },
  ]);

  const maxRows = 5;

  /* =========================
     Edit Modal State
  ========================== */
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
  });

  /* =========================
     Pagination
  ========================== */
  const totalItems = 45;
  const itemsPerPage = 5;
  const maxPageButtons = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  /* =========================
     Handlers
  ========================== */
  const openEdit = (index) => {
    if (!data[index]) return;
    setEditIndex(index);
    setEditForm(data[index]);
  };

  const closeModal = () => {
    setEditIndex(null);
  };

  const saveEdit = () => {
    const newData = [...data];
    newData[editIndex] = editForm;
    setData(newData);
    closeModal();
  };

  const deleteProduct = (index) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setData(data.filter((_, i) => i !== index));
    }
  };

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setEditForm({ ...editForm, image: reader.result });
    reader.readAsDataURL(file);
  };

  /* =========================
     Pagination Render
  ========================== */
  const renderPagination = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(
      totalPages,
      startPage + maxPageButtons - 1
    );

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  /* =========================
     Render
  ========================== */
  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
      {/* ================= Sidebar ================= */}
      <aside className="w-full md:w-52 bg-gray-200 p-2 max-h-96 overflow-y-auto mt-16">
        <h2 className="text-3xl font-bold text-center px-4 py-3 mb-4">
          Products
        </h2>

        <ul className="space-y-2">
          <li>
            <button
              onClick={() => navigate("/add-product")}
              className="flex gap-3 items-center p-2 rounded hover:bg-gray-300 w-full text-left"
            >
              <div className="w-2 h-2 bg-black" />
              Add Products
            </button>
          </li>

          <li>
            <button
              onClick={() => navigate("/admin/profile")}
              className="flex gap-3 items-center p-2 rounded hover:bg-gray-300 w-full text-left"
            >
              <div className="w-2 h-2 bg-black" />
              Admin
            </button>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex gap-3 items-center p-2 rounded hover:bg-gray-300 w-full text-left"
            >
              <div className="w-2 h-2 bg-black" />
              Log out
            </button>
          </li>
        </ul>
      </aside>

      {/* ================= Main ================= */}
      <main className="flex-1 p-4 md:p-8">
        {/* Top Buttons */}
        <div className="flex justify-end gap-4 mb-6">
          <button className="bg-yellow-100 px-6 py-2 rounded-md font-semibold">
            🔔 Notification
          </button>
          <button className="bg-cyan-700 text-white px-6 py-2 rounded-md font-semibold">
            🔄 Refresh List
          </button>
        </div>

        {/* Panel */}
        <section className="bg-gray-200 p-4 md:p-8 rounded-md">
          <h3 className="text-lg font-semibold mb-3">
            Products Management
          </h3>

          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 border rounded mb-4"
          />

          {/* Table */}
          <div className="bg-white p-4 rounded-md border overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-b">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {[...Array(maxRows)].map((_, i) => (
                  <tr key={i} className="border-b text-gray-600">
                    <td className="py-2">
                      {data[i]?.image?.includes("data:image") ? (
                        <img
                          src={data[i].image}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        data[i]?.image || "—"
                      )}
                    </td>
                    <td>{data[i]?.name || "—"}</td>
                    <td>{data[i]?.category || "—"}</td>
                    <td>{data[i]?.price || "—"}</td>
                    <td>
                      {data[i] && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEdit(i)}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(i)}
                            className="px-3 py-1 bg-red-500 text-white rounded"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 pt-4 text-white">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="bg-gray-600 px-3 py-1 rounded"
            >
              Previous
            </button>

            {renderPagination().map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`px-3 py-1 rounded ${
                  p === currentPage
                    ? "bg-blue-500 font-bold"
                    : "bg-gray-600"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="bg-gray-600 px-3 py-1 rounded"
            >
              Next
            </button>
          </div>
        </section>
      </main>

      {/* ================= Edit Modal ================= */}
      {editIndex !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Edit Product
            </h2>

            <input
              className="border p-2 w-full mb-2"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  category: e.target.value,
                })
              }
            />
            <input
              className="border p-2 w-full mb-2"
              value={editForm.price}
              onChange={(e) =>
                setEditForm({ ...editForm, price: e.target.value })
              }
            />

            <input
              type="file"
              className="mb-4"
              onChange={(e) => handleImage(e.target.files[0])}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-1 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
