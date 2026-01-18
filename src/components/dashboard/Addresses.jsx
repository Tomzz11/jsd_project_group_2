import { useEffect, useMemo, useState } from "react";
import { addressAPI } from "../../services/api"; // ✅ ปรับ path ให้ตรงโปรเจกต์อัส

export default function Address() {
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null); // ใช้ disable รายการที่กำลังยิง api
  const [error, setError] = useState("");

  const [addresses, setAddresses] = useState([]);

  // Add Address
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // Edit Address
  const [editingId, setEditingId] = useState(null);
  const [editAddress, setEditAddress] = useState({
    label: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const defaultAddressId = useMemo(() => {
    const d = addresses.find((a) => a.isDefault);
    return d?._id || null;
  }, [addresses]);

  const loadAddresses = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await addressAPI.getAll();
      setAddresses(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "โหลดที่อยู่ไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleAddAddress = async () => {
    if (!newAddress.address.trim()) return;

    setError("");
    setBusyId("add");
    try {
      const payload = {
        label: newAddress.label || "Home",
        address: newAddress.address,
        city: newAddress.city,
        postalCode: newAddress.postalCode,
        phone: newAddress.phone,
      };

      const res = await addressAPI.create(payload);
      setAddresses(res.data?.data || []);

      setNewAddress({ label: "", address: "", city: "", postalCode: "", phone: "" });
      setShowForm(false);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "เพิ่มที่อยู่ไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  const startEdit = (addr) => {
    setEditingId(addr._id);
    setEditAddress({
      label: addr.label || "",
      address: addr.address || "",
      city: addr.city || "",
      postalCode: addr.postalCode || "",
      phone: addr.phone || "",
    });
  };

  const handleSaveEdit = async (id) => {
    if (!editAddress.address.trim()) return;

    setError("");
    setBusyId(id);
    try {
      const res = await addressAPI.update(id, editAddress);
      setAddresses(res.data?.data || []);
      setEditingId(null);
      setEditAddress({ label: "", address: "", city: "", postalCode: "", phone: "" });
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "แก้ไขที่อยู่ไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("คุณต้องการลบที่อยู่นี้หรือไม่?")) return;

    setError("");
    setBusyId(id);
    try {
      const res = await addressAPI.remove(id);
      setAddresses(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "ลบที่อยู่ไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  const handleSetDefault = async (id) => {
    setError("");
    setBusyId(id);
    try {
      const res = await addressAPI.setDefault(id);
      setAddresses(res.data?.data || []);
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.message || "ตั้งค่าเริ่มต้นไม่สำเร็จ");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return <div className="max-w-xl p-4">Loading...</div>;
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">My Addresses</h2>
        <button
          onClick={loadAddresses}
          className="text-sm text-gray-500 hover:underline"
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Address List */}
      <div className="space-y-3 mb-6">
        {addresses.length === 0 ? (
          <p className="text-sm text-gray-500">No addresses added yet.</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`border rounded-lg p-4 flex justify-between items-start
                ${defaultAddressId === addr._id ? "border-black bg-gray-50" : ""}`}
            >
              {/* Address Info */}
              <div className="flex-1">
                {editingId === addr._id ? (
                  <>
                    <input
                      className="w-full border rounded p-2 mb-2"
                      value={editAddress.label}
                      onChange={(e) =>
                        setEditAddress({ ...editAddress, label: e.target.value })
                      }
                      placeholder="Home / Office"
                    />

                    <textarea
                      className="w-full border rounded p-2 mb-2"
                      rows={3}
                      value={editAddress.address}
                      onChange={(e) =>
                        setEditAddress({ ...editAddress, address: e.target.value })
                      }
                      placeholder="Address"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className="w-full border rounded p-2"
                        value={editAddress.city}
                        onChange={(e) =>
                          setEditAddress({ ...editAddress, city: e.target.value })
                        }
                        placeholder="City"
                      />
                      <input
                        className="w-full border rounded p-2"
                        value={editAddress.postalCode}
                        onChange={(e) =>
                          setEditAddress({ ...editAddress, postalCode: e.target.value })
                        }
                        placeholder="Postal code"
                      />
                    </div>

                    <input
                      className="w-full border rounded p-2 mt-2"
                      value={editAddress.phone}
                      onChange={(e) =>
                        setEditAddress({ ...editAddress, phone: e.target.value })
                      }
                      placeholder="Phone"
                    />
                  </>
                ) : (
                  <>
                    <p className="font-semibold flex items-center gap-2">
                      {addr.label || "Home"}
                      {addr.isDefault && (
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </p>

                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {addr.address}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {(addr.city || "")} {(addr.postalCode || "")}
                      {addr.phone ? ` • ${addr.phone}` : ""}
                    </p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col items-end gap-2 ml-4">
                {editingId === addr._id ? (
                  <button
                    disabled={busyId === addr._id}
                    className="text-sm text-gray-600 hover:underline disabled:opacity-50"
                    onClick={() => handleSaveEdit(addr._id)}
                  >
                    {busyId === addr._id ? "Saving..." : "Save"}
                  </button>
                ) : (
                  <>
                    <div className="flex gap-3">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => startEdit(addr)}
                      >
                        Edit
                      </button>
                      <button
                        disabled={busyId === addr._id}
                        className="text-sm text-red-600 hover:underline disabled:opacity-50"
                        onClick={() => handleDelete(addr._id)}
                      >
                        Delete
                      </button>
                    </div>

                    {!addr.isDefault && (
                      <button
                        disabled={busyId === addr._id}
                        className="text-sm text-blue-600 hover:underline disabled:opacity-50"
                        onClick={() => handleSetDefault(addr._id)}
                      >
                        {busyId === addr._id ? "Setting..." : "Use as shipping"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add address Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="text-sm text-green-600 hover:underline"
      >
        + Add Address
      </button>

      {/* Add Address Form */}
      {showForm && (
        <div className="mt-4 w-full border rounded-lg p-4 space-y-3 bg-gray-50">
          <div>
            <label className="text-sm text-gray-500">Label</label>
            <input
              className="w-full border rounded p-2 mt-1"
              type="text"
              value={newAddress.label}
              onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
              placeholder="Home / Office"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Address</label>
            <textarea
              value={newAddress.address}
              onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              className="w-full border rounded p-2 mt-1"
              rows={3}
              placeholder="Full address"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm text-gray-500">City</label>
              <input
                className="w-full border rounded p-2 mt-1"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                placeholder="Bangkok"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Postal Code</label>
              <input
                className="w-full border rounded p-2 mt-1"
                value={newAddress.postalCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, postalCode: e.target.value })
                }
                placeholder="10200"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              className="w-full border rounded p-2 mt-1"
              value={newAddress.phone}
              onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
              placeholder="0812345678"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-1 border rounded"
              disabled={busyId === "add"}
            >
              Cancel
            </button>
            <button
              onClick={handleAddAddress}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
              disabled={busyId === "add"}
            >
              {busyId === "add" ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
