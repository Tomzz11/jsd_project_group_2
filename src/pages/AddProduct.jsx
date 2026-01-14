import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
   /* =========================
     Navigation
  ========================== */
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // ===== State =====
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
  });

  // ===== Image Upload =====
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

  // ===== Save Draft =====
  const saveDraft = () => {
    localStorage.setItem("productDraft", JSON.stringify(form));
    alert("บันทึกร่างเรียบร้อย");
  };

  // ===== Cancel =====
  const cancelForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      image: null,
    });
  };

  // ===== Submit =====
  const submitForm = (e) => {
    e.preventDefault();

    // 🔥 ตรงนี้เอาไปต่อ API / state กลางได้
    console.log("New Product:", form);

    alert("บันทึกสินค้าเรียบร้อยแล้ว!");
    cancelForm();
    localStorage.removeItem("productDraft");
  };

  // ===== Load Draft =====
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("productDraft"));
    if (draft) {
      setForm(draft);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4">
      {/* Sidebar */}
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

      {/* Main */}
      <main className="flex-1 md:p-10 bg-gray-200 rounded-md">
        <h3 className="text-2xl font-bold text-center py-5 mb-4">
          Add New Product
        </h3>

        <form
          onSubmit={submitForm}
          className="bg-gray-300 p-6 rounded-md max-w-xl mx-auto space-y-6"
        >
          {/* Image upload */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white border rounded overflow-hidden flex items-center justify-center">
              {form.image ? (
                <img
                  src={form.image}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              className="border p-1 rounded cursor-pointer"
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </div>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Category"
            required
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Price"
            required
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="w-full p-2 border rounded"
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={saveDraft}
              className="bg-cyan-400 px-6 py-2 rounded font-semibold text-white hover:bg-cyan-500"
            >
              บันทึกร่าง
            </button>

            <button
              type="submit"
              className="bg-green-500 px-6 py-2 rounded font-semibold text-white hover:bg-green-600"
            >
              บันทึก
            </button>

            <button
              type="button"
              onClick={cancelForm}
              className="bg-red-500 px-6 py-2 rounded font-semibold text-white hover:bg-red-600"
            >
              ยกเลิก
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
